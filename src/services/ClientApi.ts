export async function getAllClients() {
  const response = await fetch('http://18.237.102.202:9000/admin/clients/');
  return await response.json();
}
