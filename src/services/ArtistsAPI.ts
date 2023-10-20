export async function getAllArtists() {
  const response = await fetch('http://52.38.52.160:9000/admin/artists/');
  return await response.json();
}

export async function getArtist(id: string) {
  const response = await fetch(
    `https://handsomely-divine-abstracted-bed.deploy.space/artists/${id}`,
  );
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
    name: data.name,
    email: data.email,
    phone: data.phone,
    artistId: data.id,
  };
  const response = await fetch(
    `https://handsomely-divine-abstracted-bed.deploy.space/artists/${data.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );
  return response.json();
}

export async function deleteArtist(id: string) {
  const response = await fetch(
    `https://handsomely-divine-abstracted-bed.deploy.space/artists/${id}`,
    {
      method: 'DELETE',
    },
  );
  return response.json();
}

export async function createArtist(artistData: any) {
  const response = await fetch('http://52.38.52.160:9000/admin/artists/', {
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
