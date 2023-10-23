export async function getAllClients() {
  const response = await fetch('http://18.237.102.202:9000/admin/clients/');
  return await response.json();
}

export async function createClient(clientData: any) {
  const response = await fetch('http://18.237.102.202:9000/admin/clients/', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(clientData),
  });
  if (!response.ok) {
    const errorResponse = await response.text();
    throw new Error(errorResponse);
  }
  const user = await response.json();
  return user;
}
