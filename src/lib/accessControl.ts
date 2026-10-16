import { signinCheck } from "@/lib/backendApi";
import { toast } from "sonner";

export const ACCESS_DENIED_MESSAGE = "لا، لا يمكن فتحه، هذا غير متاح حاليًا من الـ admin";

/**
 * Checks if the current authenticated user is permitted to access a specific category or level.
 */
export async function checkCategoryAccess(
  categorySlug?: string,
  level4?: boolean
): Promise<{ allowed: boolean; message: string }> {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    return {
      allowed: false,
      message: "يرجى تسجيل الدخول أولاً برقم الـ ID",
    };
  }

  try {
    const res = await signinCheck({
      userId,
      category: categorySlug,
      level4,
    });

    if (!res.ok) {
      return {
        allowed: false,
        message: ACCESS_DENIED_MESSAGE,
      };
    }

    return { allowed: true, message: "" };
  } catch (error) {
    console.error("Failed to check category access:", error);
    return {
      allowed: false,
      message: ACCESS_DENIED_MESSAGE,
    };
  }
}

/**
 * Shows the required access denied toast notification.
 */
export function notifyAccessDenied(customMsg?: string) {
  toast.error(customMsg || ACCESS_DENIED_MESSAGE, {
    duration: 5000,
    className: "font-jakarta font-semibold text-sm",
  });
}
