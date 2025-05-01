// `generateMetadata` para Open Graph y metadatos adicionales
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
