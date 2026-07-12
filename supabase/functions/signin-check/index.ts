import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const userId = (body?.userId || "").toString().trim();
    const category: string | undefined = body?.category || undefined;
    const level4: boolean = !!body?.level4;

    if (!userId) return json({ ok: false, error: "Missing ID" }, 400);

    const { data: user, error } = await supabase
      .from("valid_users")
      .select("user_id, name, access_restricted")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;
    if (!user) return json({ ok: false, error: "Invalid ID Number" });

    if (user.access_restricted && (category || level4)) {
      const { data: acc } = await supabase
        .from("user_category_access")
        .select("category_slug")
        .eq("user_id", userId);
      const slugs = (acc || []).map((r: any) => r.category_slug);
      if (category && !slugs.includes(category)) {
        return json({ ok: false, error: "Access Denied" });
      }
      if (level4 && !slugs.some((s: string) => s.startsWith("iwcf-drilling-level4"))) {
        return json({ ok: false, error: "Access Denied" });
      }
    }

    return json({ ok: true, name: user.name });
  } catch (e: any) {
    console.error("signin-check error", e);
    return json({ ok: false, error: e?.message || String(e) }, 500);
  }
});
