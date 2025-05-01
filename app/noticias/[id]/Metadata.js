// `generateMetadata` para Open Graph y metadatos adicionales
import NewsClient from '../newsClient'; // Suponiendo que 'NewsClient' es un componente React
import Head from 'next/head';
export async function generateMetadata({ params }) {
  const { id } = params;
  const noticia = await getNoticia(id);

  const cleanTitle = cleanText(noticia.title?.rendered);
  const cleanExcerpt = cleanText(noticia.excerpt?.rendered);
  const image = noticia.jetpack_featured_media_url || 'https://vivala21-j4ml.vercel.app/default-image.jpg';

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

// `page.js` con los metadatos Open Graph y Twitter
export default async function NoticiaPage({ params }) {
  const { id } = params;
  const noticia = await getNoticia(id);

  const cleanTitle = cleanText(noticia.title?.rendered);
  const cleanExcerpt = cleanText(noticia.excerpt?.rendered);
  const image = noticia.jetpack_featured_media_url || 'https://vivala21-j4ml.vercel.app/default-image.jpg';

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
