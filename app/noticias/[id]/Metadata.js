// `generateMetadata` para Open Graph y metadatos adicionales
export async function generateMetadata({ params }) {
  const { id } = params;
  const noticia = await getNoticia(id);

  if (!noticia) {
    return {
      title: 'Error al obtener la noticia',
      description: 'No se pudo cargar la información de la noticia.',
      openGraph: {
        title: 'Error al obtener la noticia',
        description: 'No se pudo cargar la información de la noticia.',
        image: 'https://vivala21-j4ml.vercel.app/default-image.jpg',
        url: `https://vivala21-j4ml.vercel.app/noticias/${id}`,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Error al obtener la noticia',
        description: 'No se pudo cargar la información de la noticia.',
        image: 'https://vivala21-j4ml.vercel.app/default-image.jpg',
      },
    };
  }

  const cleanTitle = cleanText(noticia.title?.rendered);
  const cleanExcerpt = cleanText(noticia.excerpt?.rendered);
  const image = noticia.jetpack_featured_media_url || 'https://vivala21-j4ml.vercel.app/default-image.jpg';

  return {
    title: cleanTitle,
    description: cleanExcerpt,
    openGraph: {
      title: cleanTitle,
      description: cleanExcerpt,
      image: image, // Asegúrate de usar la URL directa aquí
      url: `https://vivala21-j4ml.vercel.app/noticias/${id}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description: cleanExcerpt,
      image: image, // También aquí usa la URL directa
    },
  };
}
