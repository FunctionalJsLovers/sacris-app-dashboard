export async function getAllArtists() {
  const response = await fetch(
    'https://handsomely-divine-abstracted-bed.deploy.space/artists/',
  );
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
  artistId: string;
}

export async function editArtist(data: UserType) {
  const body = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    artistId: data.artistId,
  };
  const response = await fetch(
    `https://handsomely-divine-abstracted-bed.deploy.space/artists/${data.artistId}`,
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
  const response = await fetch(
    'https://handsomely-divine-abstracted-bed.deploy.space/artists/',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(artistData),
    },
  );
  return await response.json();
}
