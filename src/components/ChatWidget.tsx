import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, X, Send, Paperclip, FileText, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getAdminPin } from "@/lib/backendApi";
import { toast } from "sonner";

type Msg = {
  id: string;
  sender_id: string;
  sender_name: string | null;
  is_admin: boolean;
  message: string;
  attachment_name: string | null;
  attachment_type: string | null;
  attachment_signed: string | null;
  created_at: string;
};

async function callChat(body: Record<string, unknown>) {
  const pin = getAdminPin();
  const isAdminCtx = window.location.pathname.startsWith("/control-center") && !!pin;
  const { data, error } = await supabase.functions.invoke("chat", {
    body: isAdminCtx ? { ...body, pin } : { ...body, userId: localStorage.getItem("userId") || "" },
    headers: isAdminCtx ? { "x-admin-pin": pin } : undefined,
  });
  if (error) throw error;
  if ((data as any)?.error) throw new Error((data as any).error);
  return data as any;
}

const toBase64 = (f: File) =>
  new Promise<string>((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result).split(",")[1] || "");
    r.onerror = rej;
    r.readAsDataURL(f);
  });

const ChatWidget = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/control-center") && !!getAdminPin();
  const userId = localStorage.getItem("userId");
  const enabled = isAdmin || (!!userId && location.pathname !== "/");

  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [me, setMe] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [unread, setUnread] = useState(0);
  const lastRef = useRef<string | undefined>();
  const openRef = useRef(open);
  const endRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  openRef.current = open;

  // Reset when identity changes
  useEffect(() => {
    setMsgs([]);
    lastRef.current = undefined;
  }, [isAdmin, userId]);

  useEffect(() => {
    if (!enabled) return;
    let stop = false;
    const poll = async () => {
      try {
        const res = await callChat({ action: "list", since: lastRef.current });
        if (stop) return;
        setMe(res.me);
        const rows: Msg[] = res.data || [];
        if (rows.length) {
          lastRef.current = rows[rows.length - 1].created_at;
          setMsgs((prev) => {
            const ids = new Set(prev.map((m) => m.id));
            const fresh = rows.filter((r) => !ids.has(r.id));
            if (!openRef.current && prev.length) {
              setUnread((u) => u + fresh.filter((f) => f.sender_id !== res.me).length);
            }
            return [...prev, ...fresh];
          });
        }
      } catch {
        /* ignore transient */
      }
    };
    poll();
    const t = setInterval(poll, 3000);
    return () => {
      stop = true;
      clearInterval(t);
    };
  }, [enabled, isAdmin, userId]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, msgs.length]);

  if (!enabled) return null;

  const send = async () => {
    if (!text.trim() && !file) return;
    if (file && file.size > 10 * 1024 * 1024) {
      toast.error("File too large (max 10MB)");
      return;
    }
    setSending(true);
    try {
      const payload: any = { action: "send", message: text };
      if (file) payload.file = { name: file.name, type: file.type, base64: await toBase64(file) };
      const res = await callChat(payload);
      const m: Msg = res.data;
      setMsgs((p) => (p.some((x) => x.id === m.id) ? p : [...p, m]));
      lastRef.current = m.created_at;
      setText("");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (e: any) {
      toast.error(e?.message || "Message not sent");
    } finally {
      setSending(false);
    }
  };

  const remove = async (id: string) => {
    try {
      await callChat({ action: "delete", id });
      setMsgs((p) => p.filter((m) => m.id !== id));
    } catch (e: any) {
      toast.error(e?.message || "Could not delete");
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        >
          <MessageCircle className="w-6 h-6" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>
      )}
      {open && (
        <div className="fixed bottom-5 right-5 z-[60] w-[calc(100vw-2.5rem)] max-w-sm h-[70vh] max-h-[560px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col font-jakarta overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2 bg-primary text-primary-foreground">
            <MessageCircle className="w-5 h-5" />
            <div className="flex-1">
              <p className="font-bold text-sm">Group Chat</p>
              <p className="text-xs opacity-80">All candidates & admin</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-background">
            {msgs.length === 0 && (
              <p className="text-center text-sm text-muted-foreground mt-8">No messages yet. Say hello!</p>
            )}
            {msgs.map((m) => {
              const mine = m.sender_id === me;
              const isImg = m.attachment_type?.startsWith("image/");
              return (
                <div key={m.id} className={`flex flex-col ${mine ? "items-end" : "items-start"}`}>
                  <span className="text-[11px] text-muted-foreground mb-0.5 px-1">
                    {m.is_admin ? "Admin" : m.sender_name || m.sender_id}
                    {" · "}
                    {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <div
                    className={`group relative max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap break-words ${
                      mine
                        ? "bg-primary text-primary-foreground"
                        : m.is_admin
                        ? "bg-accent text-accent-foreground border border-primary/30"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {m.attachment_signed && isImg && (
                      <a href={m.attachment_signed} target="_blank" rel="noreferrer">
                        <img src={m.attachment_signed} alt={m.attachment_name || "image"} className="rounded-lg max-h-48 mb-1" />
                      </a>
                    )}
                    {m.attachment_signed && !isImg && (
                      <a
                        href={m.attachment_signed}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 underline mb-1"
                      >
                        <FileText className="w-4 h-4 shrink-0" />
                        {m.attachment_name || "Document"}
                      </a>
                    )}
                    {m.message}
                    {isAdmin && (
                      <button
                        onClick={() => remove(m.id)}
                        className="absolute -left-6 top-1 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                        aria-label="Delete message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={endRef} />
          </div>

          {file && (
            <div className="px-3 py-1.5 text-xs bg-muted flex items-center gap-2 border-t border-border">
              <Paperclip className="w-3 h-3" />
              <span className="truncate flex-1">{file.name}</span>
              <button onClick={() => setFile(null)} aria-label="Remove file">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          <div className="p-2 border-t border-border flex items-end gap-2">
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <Button variant="ghost" size="icon" onClick={() => fileRef.current?.click()} aria-label="Attach file">
              <Paperclip className="w-5 h-5" />
            </Button>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder="Type a message..."
              className="flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm max-h-24 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button size="icon" onClick={send} disabled={sending} aria-label="Send">
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
