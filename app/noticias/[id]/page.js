import NewsClient from '@/app/noticias/newsClient';
import { fetchNoticiaData } from '@/lib/fetchNoticia';

export async function generateMetadata({ params }) {
  const { id } = params;

  // Obtener los datos de la noticia
  const noticia = await fetchNoticiaData(id);

  // Manejo de errores: si no se encuentra la noticia
  if (!noticia || !noticia.title) {
    console.error('No se pudo obtener la noticia o el título está faltando');
    return {
      title: 'Noticia no disponible',
      description: 'Lo sentimos, no pudimos encontrar la noticia solicitada.',
      openGraph: {
        title: 'Noticia no disponible',
        description: 'Lo sentimos, no pudimos encontrar la noticia solicitada.',
        images: ['/default-image.jpg'],
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/noticias/${id}`,
        type: 'article',
      },
    };
  }

  // Extraer los datos necesarios para las meta etiquetas
  const yoast = noticia?.yoast_head_json || {};
  const featuredImage = noticia?._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const imageUrl = yoast?.og_image?.[0]?.url || featuredImage || '/default-image.jpg';

  // Retornar los metadatos para Open Graph
  return {
    title: yoast?.title || noticia?.title?.rendered || 'Título por defecto',
    description: yoast?.description || noticia?.excerpt?.rendered || 'Descripción por defecto',
    openGraph: {
      title: yoast?.og_title || noticia?.title?.rendered || 'Título por defecto',
      description: yoast?.og_description || noticia?.excerpt?.rendered || 'Descripción por defecto',
      images: [imageUrl],
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/noticias/${id}`,
      type: 'article',
    },
    noticia,  // Retorna los datos de la noticia para ser usados en el componente
  };
}

export default async function NewsPage({ params }) {
  const { id } = params;

  // Usamos el helper para obtener los datos de la noticia
  const noticia = await fetchNoticiaData(id);

  if (!noticia || !noticia.title) {
    return <div>No se encontró la noticia.</div>; // O mostrar un componente de error
  }

  // Renderizar el componente con los datos de la noticia
  return <NewsClient noticia={noticia} />;
}
