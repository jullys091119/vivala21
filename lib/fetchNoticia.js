export async function fetchNoticiaData(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`);

  if (!res.ok) {
    throw new Error('Error al obtener los datos de la noticia');
  }

  const noticia = await res.json();
  return noticia;
}
