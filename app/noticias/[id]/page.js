import Head from 'next/head';
import NewsClient from '@/app/noticias/newsClient';
async function fetchNoticiaData(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`);
  if (!res.ok) {
    throw new Error('Error al obtener los datos de la noticia');
  }
  return await res.json();
}

export async function generateMetadata({ params, searchParams }, parent) {
  const { id } = params;

  // Obtener los datos de la noticia
  const noticia = await fetchNoticiaData(id);

  // Extraer los metadatos de la noticia
  const yoast = noticia?.yoast_head_json || {};
  const featuredImage = noticia?._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const imageUrl = featuredImage || '/default-image.jpg';

  // Acceder y extender los metadatos anteriores si es necesario
  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: yoast.title || noticia.title?.rendered,
    description: yoast.description || noticia.excerpt?.rendered,
    openGraph: {
      title: yoast.og_title || noticia.title?.rendered,
      description: yoast.og_description || noticia.excerpt?.rendered,
      images: [yoast.og_image?.[0]?.url || imageUrl, ...previousImages],
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/noticias/${id}`,
      type: 'article',
    },
  };
}

export default function NewsPage({ params, searchParams }) {
  const { id } = params;

  return (
    <>
      <Head>
        <title>{yoast.title || noticia.title?.rendered}</title>
        <meta name="description" content={yoast.description || noticia.excerpt?.rendered} />
        <meta property="og:title" content={yoast.og_title || noticia.title?.rendered} />
        <meta property="og:description" content={yoast.og_description || noticia.excerpt?.rendered} />
        <meta property="og:image" content={yoast.og_image?.[0]?.url || '/default-image.jpg'} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/noticias/${id}`} />
        <meta property="og:type" content="article" />
      </Head>
      <NewsClient noticia={noticia} />
    </>
  );
}
