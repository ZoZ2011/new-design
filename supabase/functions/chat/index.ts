import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders as baseCors } from "npm:@supabase/supabase-js@2/cors";

const corsHeaders = {
  ...baseCors,
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-pin",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);
const ADMIN_PIN = Deno.env.get("ADMIN_PIN") || "";
const BUCKET = "chat-files";
const MAX_BYTES = 10 * 1024 * 1024;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function signRows(rows: any[]) {
  const paths = rows.filter((r) => r.attachment_url).map((r) => r.attachment_url);
  if (!paths.length) return rows;
  const { data } = await supabase.storage.from(BUCKET).createSignedUrls(paths, 60 * 60 * 24);
  const map = new Map((data || []).map((d: any) => [d.path, d.signedUrl]));
  return rows.map((r) => ({ ...r, attachment_signed: r.attachment_url ? map.get(r.attachment_url) || null : null }));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const body = await req.json().catch(() => ({}));
    const action: string = body?.action || "";
    const pin = req.headers.get("x-admin-pin") || body?.pin || "";
    const isAdmin = !!ADMIN_PIN && pin === ADMIN_PIN;
    const userId = (body?.userId || "").toString().trim();

    let senderId = "admin";
    let senderName = "Admin";
    if (!isAdmin) {
      if (!userId) return json({ error: "Missing ID" }, 401);
      const { data: u } = await supabase.from("valid_users").select("user_id, name").eq("user_id", userId).maybeSingle();
      if (!u) return json({ error: "Invalid ID" }, 401);
      senderId = u.user_id;
      senderName = u.name || `ID ${u.user_id}`;
    }

    if (action === "list") {
      const q = supabase.from("chat_messages").select("*").order("created_at", { ascending: true }).limit(500);
      const { data, error } = await q;
      if (error) throw error;
      return json({ data: await signRows(data || []), me: senderId });
    }

    if (action === "send") {
      const message = (body?.message || "").toString().slice(0, 4000);
      const file = body?.file as { name: string; type: string; base64: string } | undefined;
      let path: string | null = null;
      if (file?.base64) {
        const bytes = Uint8Array.from(atob(file.base64), (c) => c.charCodeAt(0));
        if (bytes.length > MAX_BYTES) return json({ error: "File too large (max 10MB)" }, 400);
        const safe = (file.name || "file").replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100);
        path = `${Date.now()}-${crypto.randomUUID()}-${safe}`;
        const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, bytes, {
          contentType: file.type || "application/octet-stream",
        });
        if (upErr) throw upErr;
      }
      if (!message.trim() && !path) return json({ error: "Empty message" }, 400);
      const { data, error } = await supabase
        .from("chat_messages")
        .insert({
          sender_id: senderId,
          sender_name: senderName,
          is_admin: isAdmin,
          message,
          attachment_url: path,
          attachment_name: file?.name || null,
          attachment_type: file?.type || null,
        })
        .select()
        .single();
      if (error) throw error;
      return json({ data: (await signRows([data]))[0] });
    }

    if (action === "delete") {
      const messageId = body?.id;
      if (!messageId) return json({ error: "Missing message ID" }, 400);

      // Admin can delete any message. User can delete their own message.
      let delQuery = supabase.from("chat_messages").delete().eq("id", messageId);
      if (!isAdmin) {
        delQuery = delQuery.eq("sender_id", senderId);
      }

      const { error } = await delQuery;
      if (error) throw error;
      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e: any) {
    console.error("chat error", e);
    return json({ error: e?.message || String(e) }, 500);
  }
});
