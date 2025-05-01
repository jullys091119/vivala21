// app/noticias/[id]/page.js (Página con metadatos y datos en servidor)

import NewsClient from '../newsClient'; // Suponiendo que 'NewsClient' es un componente React
import Head from 'next/head';

// Función para limpiar texto (eliminar etiquetas HTML)
const cleanText = (text) => {
  if (!text) return 'Descripción no disponible';
  return text.replace(/<[^>]*>/g, '').replace(/&[#\w]+;/g, '').trim();
};

// Función para obtener la noticia
export const getNoticia = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`);
  return await res.json();
};

// `generateMetadata` en Next.js 14
export async function generateMetadata({ params }) {
  const { id } = params;
  const noticia = await getNoticia(id);

  // console.log('Noticia:', `https://vivala21-j4ml.vercel.app/noticias/${id}`,); // Para depuración

  const cleanTitle = cleanText(noticia.title?.rendered);
  const cleanExcerpt = cleanText(noticia.excerpt?.rendered);
  const image = noticia.jetpack_featured_media_url || 'default-image-url.jpg';

  return {
    title: cleanTitle,
    description: cleanExcerpt,
    openGraph: {
      title: cleanTitle,
      description: cleanExcerpt,
      image,
      url: `https://vivala21-j4ml.vercel.app/noticias/${id}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description: cleanExcerpt,
      image,
    },
  };
}

// `page.js` con datos del servidor (sin usar hooks)
export default async function NoticiaPage({ params }) {
  const { id } = params;
  const noticia = await getNoticia(id);

  const cleanTitle = cleanText(noticia.title?.rendered);
  const cleanExcerpt = cleanText(noticia.excerpt?.rendered);
  const image = noticia.jetpack_featured_media_url || 'default-image-url.jpg';

  return (
    <div>
      <Head>
        <title>{cleanTitle}</title>
        <meta name="description" content={cleanExcerpt} />
        <meta property="og:title" content={cleanTitle} />
        <meta property="og:description" content={cleanExcerpt} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={`https://vivala21-j4ml.vercel.app/noticias/${id}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={cleanTitle} />
        <meta name="twitter:description" content={cleanExcerpt} />
        <meta name="twitter:image" content={image} />
      </Head>

      <NewsClient noticia={noticia} />
    </div>
  );
}
