import { supabase } from "@/integrations/supabase/client";

export const getAdminPin = () => sessionStorage.getItem("adminPin") || "";
export const setAdminPin = (pin: string) => sessionStorage.setItem("adminPin", pin);
export const clearAdminPin = () => sessionStorage.removeItem("adminPin");

/** Call an admin-only server operation. Requires an ADMIN_PIN set in sessionStorage. */
export async function adminOp<T = any>(
  action: string,
  payload: Record<string, unknown> = {}
): Promise<T> {
  const pin = getAdminPin();
  const { data, error } = await supabase.functions.invoke("admin-op", {
    body: { action, payload, pin },
    headers: pin ? { "x-admin-pin": pin } : undefined,
  });
  if (error) throw error;
  if (data && (data as any).error) throw new Error((data as any).error);
  return data as T;
}

/** Verify the admin PIN with the server. */
export async function verifyAdminPin(pin: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke("admin-op", {
      body: { action: "verify_pin", pin },
      headers: { "x-admin-pin": pin },
    });
    if (error) return false;
    return !!(data && (data as any).ok);
  } catch {
    return false;
  }
}

/** Public sign-in check via server. Returns { ok, name?, error? }. */
export async function signinCheck(args: {
  userId: string;
  category?: string;
  level4?: boolean;
}): Promise<{ ok: boolean; name?: string | null; error?: string }> {
  const { data, error } = await supabase.functions.invoke("signin-check", {
    body: args,
  });
  if (error) return { ok: false, error: error.message };
  return data as any;
}

/** User-data proxy (progress + settings). */
export async function userData<T = any>(
  action: string,
  userId: string,
  payload: Record<string, unknown> = {}
): Promise<T> {
  const { data, error } = await supabase.functions.invoke("user-data", {
    body: { action, userId, payload },
  });
  if (error) throw error;
  if (data && (data as any).error) throw new Error((data as any).error);
  return data as T;
}
