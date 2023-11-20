const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getAllAppointments() {
  const response = await fetch(`${apiBaseUrl}/admin/appointments/`);
  return await response.json();
}
