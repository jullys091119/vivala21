// app/noticias/[id]/page.tsx
import NewsClient from '@/app/noticias/newsClient';

export const dynamicParams = true; // permite cargar rutas no pre-renderizadas
export const revalidate = 60; // revalida cada 60 segundos

async function fetchNoticiaData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`, {
    next: { revalidate: 60 } // opcional, redundante si ya tienes `export const revalidate`
  });
  if (!res.ok) throw new Error('No se pudo cargar la noticia');
  return await res.json();
}

export async function generateMetadata({ params }) {
  const noticia = await fetchNoticiaData(params.id);
  const yoast = noticia?.yoast_head_json || {};
  const featuredImage = noticia?._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const imageUrl = yoast.og_image?.[0]?.url || featuredImage || '/default-image.jpg';

  return {
    title: yoast.title || noticia.title?.rendered,
    description: yoast.description || noticia.excerpt?.rendered,
    openGraph: {
      title: yoast.og_title || noticia.title?.rendered,
      description: yoast.og_description || noticia.excerpt?.rendered,
      images: [imageUrl],
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/noticias/${params.id}`,
      type: 'article',
    },
  };
}

export default async function NewsPage({ params }) {
  const noticia = await fetchNoticiaData(params.id);
  return <NewsClient noticia={noticia} />;
}
