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

  console.log("Generando metadatos para:", canonicalUrl); // 👀 Verifica en la consola
  console.log("Post:", post); // 👀 Verifica si la respuesta es válida
  return {
    title: post.title?.rendered || 'Noticia',
    description: post.excerpt?.rendered ? post.excerpt.rendered.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ') : '',
    openGraph: {
      title: post.title?.rendered,
      description: post.excerpt?.rendered ? post.excerpt.rendered.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ') : '',
      type: 'article',
      url: canonicalUrl,
      images: post.jetpack_featured_media_url ? [post.jetpack_featured_media_url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title?.rendered,
      description: post.excerpt?.rendered ? post.excerpt.rendered.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ') : '',
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
