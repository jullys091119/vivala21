// app/preview/[id]/page.js

import NewsClient from '../newsClient';

// Función para limpiar texto
const cleanText = (text) => {
  if (!text) return 'Descripción no disponible';
  return text.replace(/<[^>]*>/g, '').replace(/&[#\w]+;/g, '').trim();
};

// Obtener datos de la API
const getNoticia = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`);
  if (!res.ok) return null;

  return res.json();
};


export async function generateMetadata({ params }) {
  const res = await fetch(`https://api.vivalanoticia.mx/wp-json/wp/v2/posts/${params.id}`);
  const noticia = await res.json();

  const cleanTitle = noticia.title?.rendered?.replace(/<[^>]*>/g, '') || 'Sin título';
  const cleanExcerpt = noticia.excerpt?.rendered?.replace(/<[^>]*>/g, '') || 'Sin descripción';
  const image = noticia.jetpack_featured_media_url || 'https://vivala21.vercel.app/default.jpg';

  return {
    title: cleanTitle,
    description: cleanExcerpt,
    openGraph: {
      title: cleanTitle,
      description: cleanExcerpt,
      url: `https://vivala21.vercel.app/noticias/${params.id}`,
      type: 'article',
      siteName: 'Viva la 21',
      images: [
        {
          url: image, // <== aquí debe ir la URL directa del WordPress
          alt: cleanTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description: cleanExcerpt,
      images: [image], // también URL directa
    },
  };
}


// Render de la página
export default async function PreviewPage({ params }) {
  const noticia = await getNoticia(params.id);
  if (!noticia) return <div>No se encontró la noticia.</div>;

  return <NewsClient noticia={noticia} />;
}
