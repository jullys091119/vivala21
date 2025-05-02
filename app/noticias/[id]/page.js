// app/noticias/[id]/page.js
export const dynamic = 'force-dynamic';
import placeholder from '@/app/assets/images/logo.png';
import React from 'react';
import Image from 'next/image';
import NewsClient from '../newsClient';
import ShareButton from '@/app/components/ShareButton/ShareButton'; // ajusta el path si es necesario
// dentro del render:


export async function generateMetadata({ params }) {
  const { id } = params;


  const res = await fetch(`https://api.vivalanoticia.mx/wp-json/wp/v2/posts/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return {
      title: 'Noticia no encontrada',
      description: 'No se pudo cargar la noticia',
    };
  }

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
      url: `https://vivala21.vercel.app/noticias/${id}`,
      type: 'article',
      siteName: 'Viva la 21',
      images: [{ url: image, alt: cleanTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description: cleanExcerpt,
      images: [image],
    },
  };
}


// Componente principal de la página
export default async function NoticiaPage({ params }) {
  const { id } = params;

  // Llamada a la API para obtener la noticia
  const res = await fetch(`https://api.vivalanoticia.mx/wp-json/wp/v2/posts/${id}`, {
    cache: 'no-store',
  });
  const noticia = await res.json();

  // Si no se encuentra la noticia
  if (!noticia) {
    return <div>No se pudo cargar la noticia</div>;
  }

  // Pasamos la noticia al componente NewsClient
  return (
    <main style={{ padding: '1rem' }}>
      <NewsClient noticia={noticia} />
    </main>
  );
}