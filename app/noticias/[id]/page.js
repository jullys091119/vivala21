// app/noticias/[id]/page.js

import NewsClient from '../newsClient';

// Función para limpiar texto
const cleanText = (text) => {
  if (!text) return 'Descripción no disponible';
  return text.replace(/<[^>]*>/g, '').replace(/&[#\w]+;/g, '').trim();
};

// Obtener datos de la API
const getNoticia = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`, {
    next: { revalidate: 60 }, // (opcional) ISR: revalida cada 60 segundos
  });

  if (!res.ok) return null;

  return res.json();
};

// Metadatos SSR (Open Graph + Twitter)
export async function generateMetadata({ params }) {
  const noticia = await getNoticia(params.id);
  if (!noticia) return { title: 'Noticia no encontrada' };

  const cleanTitle = cleanText(noticia.title?.rendered);
  const cleanExcerpt = cleanText(noticia.excerpt?.rendered);
  const image = noticia.jetpack_featured_media_url || 'https://vivala21-j4ml.vercel.app/default-image.jpg';

  return {
    title: cleanTitle,
    description: cleanExcerpt,
    openGraph: {
      title: cleanTitle,
      description: cleanExcerpt,
      images: [image],
      url: `https://vivala21-j4ml.vercel.app/noticias/${params.id}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description: cleanExcerpt,
      images: [image],
    },
  };
}

// Render de la página
export default async function NoticiaPage({ params }) {
  const noticia = await getNoticia(params.id);
  if (!noticia) return <div>No se encontró la noticia.</div>;

  return <NewsClient noticia={noticia} />;
}
