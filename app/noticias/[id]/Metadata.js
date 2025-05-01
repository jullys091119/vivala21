// app/noticias/[id]/page.js (Solo servidor)
export async function generateMetadata({ params }) {
  const { id } = params;

  // Función para limpiar texto (eliminar etiquetas HTML)
  const cleanText = (text) => {
    if (!text) return 'Descripción no disponible';
    return text.replace(/<[^>]*>/g, '').replace(/&[#\w]+;/g, '').trim();
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`);

  if (!res.ok) {
    return {
      title: 'Noticia no encontrada',
      description: 'La noticia solicitada no está disponible.',
    };
  }

  const post = await res.json();
  const canonicalUrl = `https://vivala21-j4ml.vercel.app/noticias/${id}`;
  const title = cleanText(post.title?.rendered);
  const description = cleanText(post.excerpt?.rendered);
  const image = post.jetpack_featured_media_url || '/default-image-url.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonicalUrl,
      images: image ? [{ url: image, secure_url: image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
