const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getAllSessions() {
  const response = await fetch(`${BASE_URL}/admin/sessions/`);
  return response.json();
}
