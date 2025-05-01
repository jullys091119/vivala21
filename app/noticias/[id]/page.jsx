import NewsClient from '../newsClient';

export const dynamic = 'force-dynamic';  // Esto fuerza la renderización dinámica en el servidor

export async function generateMetadata({ params }) {
  const { id } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`,
    { cache: 'no-store' }
  );
  const post = await res.json();

  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/noticias/${id}`;

  // Limpiar las etiquetas HTML de la descripción
  const cleanDescription = (text) => text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');

  const description = cleanDescription(post.excerpt?.rendered || '');

  return {
    title: post.title?.rendered || 'Noticia',
    description: cleanDescription(post.excerpt?.rendered || ''),
    openGraph: {
      title: post.title?.rendered,
      description: cleanDescription(post.excerpt?.rendered || ''),
      type: 'article',
      url: canonicalUrl,
      images: post.jetpack_featured_media_url ? [post.jetpack_featured_media_url] : [],
      site_name: 'Viva La Noticia',  // Aquí agregas el nombre del sitio
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title?.rendered,
      description: cleanDescription(post.excerpt?.rendered || ''),
      image: post.jetpack_featured_media_url,
    },
    canonical: canonicalUrl,
  };

}

export default async function NoticiaPage({ params }) {
  const { id } = params; // ✅ También aquí
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`,
    { cache: 'no-store' }
  );

  if (!res.ok) return <p>No se encontró la noticia</p>;

  const noticia = await res.json();

  return <NewsClient noticia={noticia} />;
}
