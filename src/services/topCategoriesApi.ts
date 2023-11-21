const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getTopCategories() {
  const response = await fetch(`${apiBaseUrl}/admin/topCategoriesMonth/`);
  return await response.json();
}
