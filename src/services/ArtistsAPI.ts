const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getAllArtists() {
  const response = await fetch(`${BASE_URL}/admin/artists/`);
  return await response.json();
}

export async function getArtist(id: string) {
  const response = await fetch(`${BASE_URL}/admin/artists/${id}`);
  return await response.json();
}

interface UserType {
  name: string;
  email: string;
  phone: string;
  id: string;
}

export async function editArtist(data: UserType) {
  const body = {
    artist: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      artistId: data.id,
    },
  };
  const response = await fetch(`${BASE_URL}/admin/artists/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

export async function deleteArtist(id: string) {
  const response = await fetch(`${BASE_URL}/admin/artists/${id}`, {
    method: 'DELETE',
  });
  return response;
}

export async function createArtist(artistData: any) {
  const response = await fetch(`${BASE_URL}/admin/artists/`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(artistData),
  });
  if (!response.ok) {
    const errorResponse = await response.text();
    throw new Error(errorResponse);
  }
  const user = await response.json();
  return user;
}
