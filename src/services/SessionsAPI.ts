export async function getAllSessions() {
  const response = await fetch(
    'https://handsomely-divine-abstracted-bed.deploy.space/sessions/',
  );
  return response.json();
}

export async function fetchAppointment(appointmentId: string) {
  const response = await fetch(
    `https://handsomely-divine-abstracted-bed.deploy.space/appointments/${appointmentId}`,
  );
  return response.json();
}

export async function fetchArtist(artistId: string) {
  const response = await fetch(
    `https://handsomely-divine-abstracted-bed.deploy.space/artists/${artistId}`,
  );
  return response.json();
}
