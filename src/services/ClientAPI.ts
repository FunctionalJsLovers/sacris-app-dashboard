const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getAllClients() {
  const response = await fetch(`${BASE_URL}/admin/clients/`);
  return await response.json();
}

export async function createClient(clientData: any) {
  const response = await fetch(`${BASE_URL}/admin/clients/`, {
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

interface ClientType {
  name: string;
  email: string;
  phone: string;
  id: string;
}

export async function editClient(data: ClientType) {
  const body = {
    client: {
      name: data.name,
      email: data.email,
      phone: data.phone,
    },
  };
  const response = await fetch(`${BASE_URL}/admin/clients/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

export async function deleteClient(id: string) {
  const response = await fetch(`${BASE_URL}/admin/clients/${id}`, {
    method: 'DELETE',
  });
  return response;
}
