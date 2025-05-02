// app/noticias/[id]/page.js

import React from 'react';

export async function generateMetadata({ params }) {
  const res = await fetch(`https://api.vivalanoticia.mx/wp-json/wp/v2/posts/${params.id}`, {
    cache: 'no-store',
  });
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
          url: image,
          alt: cleanTitle,
        },
      ],
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

  return (
    <main style={{ padding: '1rem' }}>
      <h1 dangerouslySetInnerHTML={{ __html: noticia.title.rendered }} />
      <img
        src={noticia.jetpack_featured_media_url}
        alt="Imagen de la noticia"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <article dangerouslySetInnerHTML={{ __html: noticia.content.rendered }} />
    </main>
  );
}
