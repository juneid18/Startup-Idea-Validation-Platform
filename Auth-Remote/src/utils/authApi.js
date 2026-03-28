const BASE_URL = process.env.BASE_URL?.trim() || "";

async function handleResponse(response) {
  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    throw new Error(error);
  }

  return data;
}

export async function loginUser({ email, password }) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Required for cross-domain cookies
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}

export const signupUser = async ({ name, email, password }) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Required for cross-domain cookies
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(res);
};

export async function forgotPassword({ email }) {
  const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email }),
  });
  return handleResponse(res);
}

export const saveToken = (token) => localStorage.setItem("auth_token", token);
export const saveUser = (user) => localStorage.setItem("auth_user", JSON.stringify(user));

export const saveAuth = (token, user) => {
  saveToken(token);
  if (user) saveUser(user);
};

export const getToken = () => localStorage.getItem("auth_token");
export const getUser = () => {
  const u = localStorage.getItem("auth_user");
  try {
    return u ? JSON.parse(u) : null;
  } catch {
    return null;
  }
};
export const clearToken = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
};
