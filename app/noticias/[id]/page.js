// app/noticias/[id]/page.jsx
import NewsClient from '../newsClient';

export const dynamic = 'auto'; // Permite prerender si hay generateStaticParams

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts`);
  const posts = await res.json();

  return posts.map(post => ({
    id: post.id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = params;

  // Aquí estamos llamando a la API directamente, sin pasar por ningún dominio intermedio
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`,  // Endpoint correcto
    { cache: 'no-store' }
  );

  if (!res.ok) {
    return {
      title: 'Noticia no encontrada',
      description: 'La noticia solicitada no está disponible.',
    };
  }

  const post = await res.json();
  const canonicalUrl = `https://api.vivalanoticia.mx/wp-json/wp/v2/posts/${id}`; // Usamos la URL de la API directamente para el canonical

  const cleanText = (text) => {
    if (!text) return 'Descripción no disponible';
    return text.replace(/<[^>]*>/g, '').replace(/&[#\w]+;/g, '').trim();
  };

  const title = cleanText(post.title?.rendered);
  const description = cleanText(post.excerpt?.rendered);
  const image = post.jetpack_featured_media_url || '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonicalUrl,
      images: image ? [{
        url: image,
        secure_url: image,
      }] : [],
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

export default async function NoticiaPage({ params }) {
  const { id } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`, // Endpoint correcto
    { cache: 'no-store' }
  );

  if (!res.ok) return <p>No se encontró la noticia</p>;

  const noticia = await res.json();
  return <NewsClient noticia={noticia} />;
}
