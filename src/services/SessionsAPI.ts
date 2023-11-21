export async function getAllSessions() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const response = await fetch(`${apiBaseUrl}/admin/sessions/`);
  return response.json();
}

export async function getAllSessionsForAppointment(appointmentId: string) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const response = await fetch(
    `${apiBaseUrl}/admin/appointments/${appointmentId}/sessions`,
  );
  return response.json();
}
