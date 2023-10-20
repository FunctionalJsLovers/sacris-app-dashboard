export async function getAllSessions() {
  const response = await fetch('http://52.38.52.160:9000/admin/sessions/');
  return response.json();
}
