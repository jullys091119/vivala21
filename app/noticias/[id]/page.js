
import { fetchNoticia } from '@/utils/fetchNoticia';
import NewsClient from '@/app/noticias/newsClient';


export async function generateMetadata({ params }) {
  const noticia = await fetchNoticia(params.id);
  const yoast = noticia?.yoast_head_json || {};

  return {
    title: yoast.title || noticia?.title?.rendered,
    description: yoast.description || noticia?.excerpt?.rendered,
    openGraph: {
      title: yoast['og:title'] || noticia?.title?.rendered,
      description: yoast['og:description'] || noticia?.excerpt?.rendered,
      images: [yoast['og:image'] || noticia?._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''],
    },
  };
}

export default async function Page({ params }) {
  const noticia = await fetchNoticia(params.id);

  if (!noticia) return <div>No se encontró la noticia</div>;

  return <NewsClient noticia={noticia} />;
}