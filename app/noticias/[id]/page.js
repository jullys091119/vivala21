import NewsClient from '../newsClient';

export const dynamic = 'auto'; // Permite prerender si hay generateStaticParams

// Función para generar los parámetros estáticos
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts`);
  const posts = await res.json();

  // Aquí generamos los parámetros estáticos para cada noticia
  return posts.map(post => ({
    id: post.id.toString(),
  }));
}

// Función para generar los metadatos para la página
export async function generateMetadata({ params }) {
  const { id } = params;

  // Llamada a la API para obtener los datos de la noticia
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    return {
      title: 'Noticia no encontrada',
      description: 'La noticia solicitada no está disponible.',
    };
  }

  const post = await res.json();

  // URL para el canonical desde la API
  const canonicalUrl = `https://api.vivalanoticia.mx/noticias/${id}`;

  const cleanText = (text) => {
    if (!text) return 'Descripción no disponible';
    return text.replace(/<[^>]*>/g, '').replace(/&[#\w]+;/g, '').trim();
  };

  const title = cleanText(post.title?.rendered);
  const description = cleanText(post.excerpt?.rendered);
  const image = post.jetpack_featured_media_url || '';

  // Generación de los metadatos para la página
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

// Componente para la página de la noticia
export default async function NoticiaPage({ params }) {
  const { id } = params;

  // Llamada a la API para obtener los datos de la noticia
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`,
    { cache: 'no-store' }
  );

  if (!res.ok) return <p>No se encontró la noticia</p>;

  const noticia = await res.json();
  return <NewsClient noticia={noticia} />;
}
