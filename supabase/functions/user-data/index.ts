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

async function assertValidUser(userId: string): Promise<boolean> {
  const { data } = await supabase
    .from("valid_users")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();
  return !!data;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const action: string = body?.action || "";
    const userId: string = (body?.userId || "").toString().trim();
    const p: any = body?.payload || {};

    if (!userId) return json({ error: "Missing userId" }, 400);
    if (!(await assertValidUser(userId))) {
      return json({ error: "Invalid user" }, 401);
    }

    switch (action) {
      case "get_progress": {
        const { data, error } = await supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", userId)
          .eq("category", p.category);
        if (error) throw error;
        return json({ data });
      }
      case "save_progress": {
        const { error } = await supabase.from("user_progress").upsert(
          {
            user_id: userId,
            category: p.category,
            question_id: String(p.question_id),
            selected_answer: p.selected_answer,
            is_submitted: !!p.is_submitted,
          },
          { onConflict: "user_id,category,question_id" }
        );
        if (error) throw error;
        return json({ ok: true });
      }
      case "clear_progress": {
        const { error } = await supabase
          .from("user_progress")
          .delete()
          .eq("user_id", userId)
          .eq("category", p.category);
        if (error) throw error;
        return json({ ok: true });
      }
      case "get_settings": {
        const { data, error } = await supabase
          .from("user_settings")
          .select("*")
          .eq("user_id", userId)
          .maybeSingle();
        if (error) throw error;
        return json({ data });
      }
      case "save_settings": {
        const { error } = await supabase.from("user_settings").upsert(
          {
            user_id: userId,
            theme: p.theme,
            font_size: p.font_size,
            sound_effects: p.sound_effects,
            auto_submit: p.auto_submit,
          },
          { onConflict: "user_id" }
        );
        if (error) throw error;
        return json({ ok: true });
      }
      default:
        return json({ error: "Unknown action" }, 400);
    }
  } catch (e: any) {
    console.error("user-data error", e);
    return json({ error: e?.message || String(e) }, 500);
  }
});
