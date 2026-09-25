const SECRET_KEY = "ocean-admin-secret";

let secret = "";

export function setAdminSecret(value: string) {
  secret = value;
  if (typeof window === "undefined") return;
  if (value) window.sessionStorage.setItem(SECRET_KEY, value);
  else window.sessionStorage.removeItem(SECRET_KEY);
}

export function getAdminSecret() {
  if (secret) return secret;
  if (typeof window === "undefined") return "";
  secret = window.sessionStorage.getItem(SECRET_KEY) ?? "";
  return secret;
}

export function cmsHeaders(json = true) {
  const headers: Record<string, string> = {};
  if (json) headers["Content-Type"] = "application/json";
  const value = getAdminSecret();
  if (value) headers["x-ocean-admin"] = value;
  return headers;
}
