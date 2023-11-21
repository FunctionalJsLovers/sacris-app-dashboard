const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getAllCategories() {
  const response = await fetch(`${apiBaseUrl}/admin/categories/`);
  return await response.json();
}
