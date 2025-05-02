// app/noticias/[id]/page.js
export const dynamic = 'force-dynamic';
import placeholder from '@/app/assets/images/logo.png';
import React from 'react';
import Image from 'next/image';
import ShareButton from '@/app/components/ShareButton/ShareButton'; // ajusta el path si es necesario
// dentro del render:


export async function generateMetadata({ params }) {
  const { id } = params;

  // 🚫 NO hagas console.log directo con objetos grandes en Next.js App Router.
  // Si necesitas depurar:
  console.log('ID:', id);

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


export default async function NoticiaPage({ params }) {
  const res = await fetch(`https://api.vivalanoticia.mx/wp-json/wp/v2/posts/${params.id}`, {
    cache: 'no-store',
  });
  const noticia = await res.json();

  const shareUrl = `https://vivala21.vercel.app/noticias/${params.id}`;

  return (
    <main style={{ padding: '1rem' }}>
      <h1 dangerouslySetInnerHTML={{ __html: noticia.title.rendered }} />
      <Image
        src={noticia.jetpack_featured_media_url || placeholder}
        alt="Imagen de la noticia"
        style={{ maxWidth: '100%', height: 'auto' }}
        width={800}
        height={500}
      />
      <article dangerouslySetInnerHTML={{ __html: noticia.content.rendered }} />

      <ShareButton url={`https://vivala21.vercel.app/noticias/${params.id}`} title={noticia.title.rendered} />
    </main>
  );
}