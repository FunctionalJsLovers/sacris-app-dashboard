export async function getAllSessions() {
  const response = await fetch('http://34.220.171.214:9000/admin/sessions/');
  return response.json();
}
