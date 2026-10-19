export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export const AUTH_COOKIE_NAME = "realestate_auth";
export const AUTH_USER_KEY = "realestate_auth_user";

/**
 * Checks if the current client is authenticated
 * Uses document.cookie first, and falls back to localStorage
 */
export function isUserAuthenticated(): boolean {
  if (typeof window === "undefined") return false;

  // 1. Check document.cookie
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  const hasCookie = cookies.some((item) =>
    item.startsWith(`${AUTH_COOKIE_NAME}=`) && !item.endsWith("=false")
  );
  if (hasCookie) return true;

  // 2. Check localStorage as fallback
  try {
    const stored = localStorage.getItem(AUTH_USER_KEY);
    if (stored) {
      // Re-sync cookie if missing
      document.cookie = `${AUTH_COOKIE_NAME}=true; path=/; max-age=2592000; SameSite=Lax`;
      return true;
    }
  } catch {
    // Ignore localStorage restriction
  }

  return false;
}

/**
 * Retrieves the currently logged-in user details
 */
export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (raw) {
      return JSON.parse(raw) as AuthUser;
    }
  } catch {
    // Ignore error
  }
  return null;
}

/**
 * Saves authenticated session with cookie and localStorage
 */
export function setAuthSession(
  user: Partial<AuthUser> & { identifier?: string },
  rememberMe: boolean = false
): void {
  if (typeof window === "undefined") return;

  const defaultName =
    user.fullName ||
    (user.identifier?.includes("@")
      ? user.identifier.split("@")[0]
      : user.identifier) ||
    "محمد أحمد";

  const defaultEmail =
    user.email ||
    (user.identifier?.includes("@") ? user.identifier : "admin@abraj.sa");

  const authUser: AuthUser = {
    id: user.id || "user-1",
    fullName: defaultName,
    email: defaultEmail,
    role: user.role || "مدير النظام",
  };

  // 30 days if rememberMe, otherwise 7 days for stable dev experience
  const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7;
  document.cookie = `${AUTH_COOKIE_NAME}=true; path=/; max-age=${maxAge}; SameSite=Lax`;

  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));
  } catch {
    // Ignore
  }
}

/**
 * Clears authenticated session from cookie and localStorage
 */
export function clearAuthSession(): void {
  if (typeof window === "undefined") return;

  // Expire cookie across root and basePath
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax`;
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/Edaret_Amlak; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax`;

  try {
    localStorage.removeItem(AUTH_USER_KEY);
    sessionStorage.clear();
  } catch {
    // Ignore
  }
}
