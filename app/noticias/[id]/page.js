import NewsClient from '@/app/noticias/newsClient';

export async function generateMetadata({ params }) {
  const { id } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`);
  const noticia = await res.json();
  const yoast = noticia?.yoast_head_json || {};
  const featuredImage = noticia?._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const imageUrl = featuredImage || '/default-image.jpg';

  return {
    title: yoast.title || noticia.title?.rendered,
    description: yoast.description || noticia.excerpt?.rendered,
    openGraph: {
      title: yoast.og_title || noticia.title?.rendered,
      description: yoast.og_description || noticia.excerpt?.rendered,
      images: [
        yoast.og_image?.[0]?.url || imageUrl,
      ],
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/noticias/${id}`,
      type: 'article',
    },
  };
}

export default async function NewsPage({ params }) {
  const { id } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`);
  const noticia = await res.json();

  return <NewsClient noticia={noticia} />;
}
