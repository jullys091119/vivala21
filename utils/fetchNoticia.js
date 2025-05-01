// utils/fetchNoticia.js
export async function fetchNoticia(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Error al obtener la noticia');
  }

  return await res.json();
}
