export async function getAllSessions() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const response = await fetch(`${apiBaseUrl}/admin/sessions/`);
  return response.json();
}
