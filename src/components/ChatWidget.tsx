import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  MessageCircle,
  X,
  Send,
  Paperclip,
  FileText,
  Loader2,
  Trash2,
  Search,
  Mic,
  MicOff,
  User,
  Shield,
  ChevronDown,
  ChevronUp,
  FileCode,
  Link2,
  Hash,
  Square,
  Volume2,
} from "lucide-react";
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

const toBase64 = (f: File | Blob) =>
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
  const userName = localStorage.getItem("userName");
  const enabled = isAdmin || (!!userId && location.pathname !== "/");

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"group" | "admin_direct">("group");
  const [searchQuery, setSearchQuery] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [me, setMe] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [unread, setUnread] = useState(0);

  // Audio recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordTimerRef = useRef<any>(null);

  // UI accordion sections in right sidebar
  const [generalOpen, setGeneralOpen] = useState(true);
  const [filesOpen, setFilesOpen] = useState(false);
  const [linksOpen, setLinksOpen] = useState(false);

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

  // Polling & Real-time sync across all devices
  useEffect(() => {
    if (!enabled) return;
    let stop = false;
    const poll = async () => {
      try {
        const res = await callChat({ action: "list" });
        if (stop) return;
        setMe(res.me);
        const rows: Msg[] = res.data || [];
        setMsgs((prev) => {
          // If first load or list updated
          if (!openRef.current && prev.length > 0) {
            const prevIds = new Set(prev.map((m) => m.id));
            const fresh = rows.filter((r) => !prevIds.has(r.id));
            if (fresh.length > 0) {
              setUnread((u) => u + fresh.filter((f) => f.sender_id !== res.me).length);
            }
          }
          return rows;
        });
      } catch {
        /* ignore transient */
      }
    };
    poll();
    const t = setInterval(poll, 2500);

    // Realtime channel for instant deletion & message sync across all devices
    const channel = supabase
      .channel("chat-realtime-sync")
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "chat_messages" },
        (payload) => {
          const deletedId = (payload.old as any)?.id;
          if (deletedId) {
            setMsgs((prev) => prev.filter((m) => m.id !== deletedId));
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },
        () => {
          poll();
        }
      )
      .subscribe();

    return () => {
      stop = true;
      clearInterval(t);
      supabase.removeChannel(channel);
    };
  }, [enabled, isAdmin, userId]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, msgs.length, activeTab]);

  // Handle voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach((track) => track.stop());

        // Send recorded audio
        setSending(true);
        try {
          const base64Audio = await toBase64(audioBlob);
          const prefix = activeTab === "admin_direct" ? "[DIRECT TO ADMIN] " : "";
          const payload: any = {
            action: "send",
            message: `${prefix}🎤 Voice message (${recordDuration}s)`,
            file: {
              name: `voice-note-${Date.now()}.webm`,
              type: "audio/webm",
              base64: base64Audio,
            },
          };
          const res = await callChat(payload);
          const m: Msg = res.data;
          setMsgs((p) => (p.some((x) => x.id === m.id) ? p : [...p, m]));
          lastRef.current = m.created_at;
          toast.success("Voice message sent!");
        } catch (e: any) {
          toast.error(e?.message || "Failed to send voice message");
        } finally {
          setSending(false);
          setRecordDuration(0);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordDuration(0);
      recordTimerRef.current = setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      toast.error("Microphone access denied or not available");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    }
  };

  if (!enabled) return null;

  const send = async () => {
    if (!text.trim() && !file) return;
    if (file && file.size > 10 * 1024 * 1024) {
      toast.error("File too large (max 10MB)");
      return;
    }
    setSending(true);
    try {
      const finalMsg = activeTab === "admin_direct" ? `[DIRECT TO ADMIN] ${text}` : text;
      const payload: any = { action: "send", message: finalMsg };
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
      // Call backend to permanently delete message from database
      await callChat({ action: "delete", id });
      setMsgs((p) => p.filter((m) => m.id !== id));
      toast.success("Message deleted everywhere");
    } catch (e: any) {
      toast.error(e?.message || "Could not delete message");
    }
  };

  // Filter messages based on active tab and search query
  const filteredMsgs = msgs.filter((m) => {
    const isDirect = m.message.startsWith("[DIRECT TO ADMIN]");
    if (activeTab === "admin_direct") {
      // In direct to admin tab: only show direct messages for this user or admin
      if (!isDirect) return false;
      if (!isAdmin && m.sender_id !== me && !m.is_admin) return false;
    } else {
      // Group tab: show normal messages (or if user is in group)
      if (isDirect && !isAdmin && m.sender_id !== me) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchMsg = m.message.toLowerCase().includes(q);
      const matchSender = (m.sender_name || m.sender_id).toLowerCase().includes(q);
      return matchMsg || matchSender;
    }
    return true;
  });

  // Extract shared files from messages
  const sharedFiles = msgs.filter((m) => m.attachment_signed);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-[#7064f2] text-white shadow-xl flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
        >
          <MessageCircle className="w-6 h-6" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shadow-md">
              {unread}
            </span>
          )}
        </button>
      )}

      {open && (
        <div className="fixed inset-2 sm:inset-auto sm:bottom-6 sm:right-6 z-[60] sm:w-[940px] sm:h-[620px] max-w-[96vw] max-h-[94vh] bg-white rounded-3xl shadow-2xl border border-slate-200/80 flex overflow-hidden font-jakarta animate-in fade-in zoom-in-95 duration-200">
          {/* ================= LEFT SIDEBAR: CHANNEL & CHAT LIST ================= */}
          <div className="w-64 sm:w-72 bg-[#f8f9fc] border-r border-slate-100 flex flex-col shrink-0">
            {/* Search Box */}
            <div className="p-3.5 border-b border-slate-100">
              <div className="relative flex items-center bg-white rounded-xl border border-slate-200/80 px-3 py-2 shadow-xs">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search messages..."
                  className="w-full text-xs bg-transparent border-0 outline-none ml-2 text-slate-700 placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-slate-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Conversation Tabs / Channels */}
            <div className="flex-1 overflow-y-auto p-2.5 space-y-1">
              <div className="px-2 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Channels
              </div>

              {/* Group Chat Item */}
              <button
                onClick={() => setActiveTab("group")}
                className={`w-full p-3 rounded-2xl flex items-center gap-3 text-left transition-all cursor-pointer ${
                  activeTab === "group"
                    ? "bg-white shadow-xs border border-slate-100"
                    : "hover:bg-slate-200/50 text-slate-600"
                }`}
              >
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                  WCC
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-xs text-slate-900 truncate">Candidates Group</p>
                    <span className="text-[10px] text-slate-400">All</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {msgs.length > 0 ? msgs[msgs.length - 1].message.slice(0, 24) : "Public discussion"}
                  </p>
                </div>
              </button>

              {/* Direct to Admin Channel Item */}
              <button
                onClick={() => setActiveTab("admin_direct")}
                className={`w-full p-3 rounded-2xl flex items-center gap-3 text-left transition-all cursor-pointer ${
                  activeTab === "admin_direct"
                    ? "bg-white shadow-xs border border-slate-100"
                    : "hover:bg-slate-200/50 text-slate-600"
                }`}
              >
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#06b6d4] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                  <Shield className="w-5 h-5 text-white" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-xs text-slate-900 truncate">Direct to Admin</p>
                    <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded-full">
                      Private
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    Send private inquiries to admin
                  </p>
                </div>
              </button>

              <div className="px-2 pt-4 pb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Quick Tags
              </div>
              <div className="px-2 flex flex-wrap gap-1.5">
                <button
                  onClick={() => setText((t) => `${t} #admin `)}
                  className="text-[11px] font-medium bg-white hover:bg-slate-100 border border-slate-200/70 text-slate-700 px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Hash className="w-3 h-3 text-primary" /> admin
                </button>
                <button
                  onClick={() => setText((t) => `${t} #question `)}
                  className="text-[11px] font-medium bg-white hover:bg-slate-100 border border-slate-200/70 text-slate-700 px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Hash className="w-3 h-3 text-primary" /> question
                </button>
                <button
                  onClick={() => setText((t) => `${t} #exam `)}
                  className="text-[11px] font-medium bg-white hover:bg-slate-100 border border-slate-200/70 text-slate-700 px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Hash className="w-3 h-3 text-primary" /> exam
                </button>
              </div>
            </div>

            {/* Current user footer badge */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0">
                  {isAdmin ? "A" : (userName || userId || "U").charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">
                    {isAdmin ? "Admin (You)" : userName || `ID: ${userId}`}
                  </p>
                  <span className="text-[10px] text-emerald-600 font-medium">● Online</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 sm:hidden"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ================= CENTER: MAIN CHAT THREAD ================= */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f1f3f9] flex items-center justify-center text-primary font-bold text-sm">
                  {activeTab === "admin_direct" ? <Shield className="w-4 h-4 text-blue-600" /> : <MessageCircle className="w-4 h-4 text-primary" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {activeTab === "admin_direct" ? "Direct to Admin (Private)" : "Well Control Club Discussion"}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {activeTab === "admin_direct"
                      ? "Only you and admin can view messages here"
                      : "Shared forum for IWCF & IADC prep"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#fcfdff]">
              {filteredMsgs.length === 0 && (
                <div className="text-center py-16 text-slate-400 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-medium">No messages in this channel yet.</p>
                  <p className="text-[11px] text-slate-400">
                    Type a message, record voice, or attach files below.
                  </p>
                </div>
              )}

              {filteredMsgs.map((m) => {
                const localUid = userId || localStorage.getItem("userId") || "";
                const mine = m.sender_id === me || (!!localUid && m.sender_id === localUid);
                const isAudio = m.attachment_type?.startsWith("audio/") || m.attachment_name?.endsWith(".webm");
                const isImg = m.attachment_type?.startsWith("image/");
                const isDoc = m.attachment_signed && !isImg && !isAudio;
                const cleanMessage = m.message.replace(/^\[DIRECT TO ADMIN\]\s*/, "");

                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 group ${mine ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* User Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ${
                        mine
                          ? "bg-slate-800 text-white"
                          : m.is_admin
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {m.is_admin ? "A" : (m.sender_name || m.sender_id || "U").charAt(0).toUpperCase()}
                    </div>

                    <div className={`max-w-[75%] sm:max-w-[65%] flex flex-col ${mine ? "items-end" : "items-start"}`}>
                      {/* Sender Info & Time */}
                      <div className="flex items-center gap-1.5 mb-1 px-1">
                        <span className="text-[11px] font-bold text-slate-700">
                          {mine ? "You" : m.is_admin ? "Admin" : m.sender_name || `ID: ${m.sender_id}`}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        {m.message.startsWith("[DIRECT TO ADMIN]") && (
                          <span className="text-[9px] bg-blue-100 text-blue-700 font-semibold px-1.5 py-0.2 rounded-full">
                            Admin Only
                          </span>
                        )}
                      </div>

                      {/* Bubble */}
                      <div
                        className={`relative rounded-2xl px-4 py-3 text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                          mine
                            ? "bg-[#d9ebff] text-slate-900 rounded-tr-none"
                            : "bg-[#f1f3f7] text-slate-800 rounded-tl-none"
                        }`}
                      >
                        {/* Audio attachment */}
                        {m.attachment_signed && isAudio && (
                          <div className="mb-2 bg-white/90 rounded-xl p-2 flex items-center gap-2 border border-slate-200/60 shadow-xs">
                            <Volume2 className="w-4 h-4 text-primary shrink-0" />
                            <audio controls src={m.attachment_signed} className="h-8 max-w-[200px]" />
                          </div>
                        )}

                        {/* Image attachment */}
                        {m.attachment_signed && isImg && (
                          <a href={m.attachment_signed} target="_blank" rel="noreferrer" className="block mb-2">
                            <img
                              src={m.attachment_signed}
                              alt={m.attachment_name || "Attachment"}
                              className="rounded-xl max-h-48 object-cover border border-black/5"
                            />
                          </a>
                        )}

                        {/* Document attachment styled like presentation.pdf in the screenshot */}
                        {m.attachment_signed && isDoc && (
                          <a
                            href={m.attachment_signed}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 p-2.5 mb-2 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                              <Paperclip className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-xs text-slate-900 truncate">
                                {m.attachment_name || "Document.pdf"}
                              </p>
                              <p className="text-[10px] text-slate-400">Click to view/download</p>
                            </div>
                          </a>
                        )}

                        {/* Text Message with styled Hashtags */}
                        <div className="whitespace-pre-wrap break-words">
                          {cleanMessage.split(/(\s+)/).map((word, wIdx) => {
                            if (word.startsWith("#")) {
                              return (
                                <span
                                  key={wIdx}
                                  className="font-bold text-blue-600 bg-blue-50/80 px-1 py-0.5 rounded cursor-pointer"
                                >
                                  {word}
                                </span>
                              );
                            }
                            return word;
                          })}
                        </div>

                        {/* Delete message button (shown for admin or message owner) */}
                        {(isAdmin || mine) && (
                          <button
                            onClick={() => remove(m.id)}
                            title="Delete message"
                            className={`absolute top-2 ${
                              mine ? "-left-7" : "-right-7"
                            } opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:!opacity-100 w-6 h-6 rounded-full bg-white text-slate-400 hover:text-red-500 hover:bg-red-50 shadow-xs border border-slate-200 flex items-center justify-center transition-all cursor-pointer`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      <div className="text-[9px] text-slate-400 mt-1 flex items-center gap-1 px-1">
                        <span>via App</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={endRef} />
            </div>

            {/* File attachment preview */}
            {file && (
              <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 text-xs">
                <Paperclip className="w-3.5 h-3.5 text-blue-600" />
                <span className="truncate flex-1 font-medium text-slate-700">{file.name}</span>
                <button onClick={() => setFile(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Voice recording active indicator */}
            {isRecording && (
              <div className="px-4 py-2 bg-red-50 border-t border-red-100 flex items-center justify-between text-xs text-red-600 animate-pulse">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  <span className="font-semibold">Recording voice message... ({recordDuration}s)</span>
                </div>
                <button
                  onClick={stopRecording}
                  className="bg-red-600 text-white rounded-full px-3 py-1 text-xs font-semibold hover:bg-red-700 flex items-center gap-1 cursor-pointer"
                >
                  <Square className="w-3 h-3" /> Stop & Send
                </button>
              </div>
            )}

            {/* Input Bar matching reference image style */}
            <div className="p-3.5 bg-white border-t border-slate-100 flex items-center gap-2">
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />

              {/* Attachment Pill Button */}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                title="Attach file"
                className="w-9 h-9 rounded-full bg-[#f1f3f9] hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              {/* Voice Note Button */}
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                title={isRecording ? "Stop recording" : "Record voice message"}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                  isRecording
                    ? "bg-red-500 text-white animate-bounce"
                    : "bg-[#f1f3f9] hover:bg-slate-200 text-slate-600"
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Direct to Admin Badge indicator in input */}
              {activeTab === "admin_direct" && (
                <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-full shrink-0 border border-blue-200/60 hidden sm:inline">
                  Direct to Admin
                </span>
              )}

              {/* Text Input */}
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder={
                  activeTab === "admin_direct"
                    ? "Write a private message to admin..."
                    : "You are welcome! (type message or #tag)"
                }
                className="flex-1 bg-[#f1f3f9] rounded-full px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none border border-transparent focus:border-purple-300 transition-all"
              />

              {/* Purple Pill Send Button exactly like in screenshot */}
              <button
                type="button"
                onClick={send}
                disabled={sending || (!text.trim() && !file)}
                aria-label="Send"
                className="w-10 h-10 rounded-full bg-[#8075f8] hover:bg-[#6c5fe8] text-white flex items-center justify-center shadow-md transition-all disabled:opacity-50 shrink-0 cursor-pointer"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
              </button>
            </div>
          </div>

          {/* ================= RIGHT SIDEBAR: GENERAL INFO & NOTES ================= */}
          <div className="w-64 bg-[#fbfbfe] border-l border-slate-100 hidden lg:flex flex-col p-4 overflow-y-auto space-y-4 shrink-0 text-xs">
            {/* General Info Accordion */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
              <div
                className="flex items-center justify-between font-bold text-slate-800 cursor-pointer"
                onClick={() => setGeneralOpen(!generalOpen)}
              >
                <span>General info</span>
                {generalOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>

              {generalOpen && (
                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      {isAdmin ? "A" : (userName || userId || "U").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-xs">
                        {isAdmin ? "Chief Admin" : userName || `Candidate ${userId}`}
                      </p>
                      <p className="text-[11px] text-slate-400">{isAdmin ? "Admin Account" : `ID: ${userId}`}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Role & Access</p>
                    <p className="text-slate-700 font-medium">{isAdmin ? "Administrator" : "Active Candidate"}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Date Joined</p>
                    <p className="text-slate-700 font-medium">Oct 2026</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Status</p>
                    <span className="inline-block bg-[#8075f8] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      Active User
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Collapsible Shared Files Section */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2">
              <div
                className="flex items-center justify-between font-bold text-slate-800 cursor-pointer"
                onClick={() => setFilesOpen(!filesOpen)}
              >
                <span>Shared Files ({sharedFiles.length})</span>
                {filesOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
              {filesOpen && (
                <div className="space-y-1.5 pt-1">
                  {sharedFiles.length === 0 ? (
                    <p className="text-[11px] text-slate-400">No shared documents yet</p>
                  ) : (
                    sharedFiles.map((sf) => (
                      <a
                        key={sf.id}
                        href={sf.attachment_signed!}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded-lg text-slate-700 truncate"
                      >
                        <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate text-[11px]">{sf.attachment_name || "Attachment"}</span>
                      </a>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
