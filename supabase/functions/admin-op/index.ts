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

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    // Admin PIN removed at owner's request; access is gated by "ADMIN DASH" in the UI.
    void ADMIN_PIN;

    const action: string = body?.action || "";
    const p: any = body?.payload || {};

    switch (action) {
      case "verify_pin":
        return json({ ok: true });

      // ------- valid_users -------
      case "list_valid_users": {
        const { data, error } = await supabase
          .from("valid_users")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        return json({ data });
      }
      case "add_valid_user": {
        const { data, error } = await supabase
          .from("valid_users")
          .insert({ user_id: p.user_id, name: p.name ?? null })
          .select()
          .single();
        if (error) return json({ error: error.message, code: error.code }, 400);
        return json({ data });
      }
      case "delete_valid_user": {
        const { error } = await supabase
          .from("valid_users")
          .delete()
          .eq("id", p.id);
        if (error) throw error;
        return json({ ok: true });
      }
      case "get_user_access": {
        const [access, user] = await Promise.all([
          supabase
            .from("user_category_access")
            .select("category_slug")
            .eq("user_id", p.user_id),
          supabase
            .from("valid_users")
            .select("access_restricted")
            .eq("user_id", p.user_id)
            .single(),
        ]);
        return json({
          access: access.data?.map((r: any) => r.category_slug) ?? [],
          access_restricted: (user.data as any)?.access_restricted ?? false,
        });
      }
      case "set_user_access": {
        const { user_id, slugs, access_restricted } = p;
        await supabase
          .from("user_category_access")
          .delete()
          .eq("user_id", user_id);
        await supabase
          .from("valid_users")
          .update({ access_restricted: !!access_restricted })
          .eq("user_id", user_id);
        if (access_restricted && Array.isArray(slugs) && slugs.length > 0) {
          const rows = slugs.map((s: string) => ({
            user_id,
            category_slug: s,
          }));
          const { error } = await supabase
            .from("user_category_access")
            .insert(rows);
          if (error) throw error;
        }
        return json({ ok: true });
      }

      // ------- user_progress (admin view) -------
      case "get_user_progress": {
        const { data, error } = await supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", p.user_id);
        if (error) throw error;
        return json({ data });
      }

      // ------- dynamic_questions -------
      case "update_question_answer": {
        const { id, correct_answer } = p;
        const { error } = await supabase
          .from("dynamic_questions")
          .update({ correct_answer })
          .eq("id", id);
        if (error) throw error;
        return json({ ok: true });
      }
      case "replace_category_questions": {
        // Delete all in category and insert new rows
        const { category_slug, rows } = p;
        await supabase
          .from("dynamic_questions")
          .delete()
          .eq("category_slug", category_slug);
        if (Array.isArray(rows) && rows.length > 0) {
          const { error } = await supabase
            .from("dynamic_questions")
            .insert(rows);
          if (error) throw error;
        }
        return json({ ok: true });
      }
      case "insert_questions": {
        const { rows } = p;
        const { error } = await supabase
          .from("dynamic_questions")
          .insert(rows);
        if (error) throw error;
        return json({ ok: true });
      }

      // ------- question_categories -------
      case "insert_category": {
        const { error } = await supabase
          .from("question_categories")
          .insert(p.row);
        if (error) throw error;
        return json({ ok: true });
      }
      case "delete_category": {
        const { slug } = p;
        await supabase
          .from("dynamic_questions")
          .delete()
          .eq("category_slug", slug);
        await supabase
          .from("question_categories")
          .delete()
          .eq("slug", slug);
        return json({ ok: true });
      }

      // ------- storage: question-images -------
      case "upload_question_image": {
        const { path, base64, content_type } = p;
        const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
        const { error } = await supabase.storage
          .from("question-images")
          .upload(path, bytes, {
            upsert: true,
            contentType: content_type || "image/png",
          });
        if (error) throw error;
        const { data } = supabase.storage
          .from("question-images")
          .getPublicUrl(path);
        return json({ url: data.publicUrl });
      }

      default:
        return json({ error: "Unknown action" }, 400);
    }
  } catch (e: any) {
    console.error("admin-op error", e);
    return json({ error: e?.message || String(e) }, 500);
  }
});
