export async function generateMetadata({ params }) {
  const { id } = params; // ✅ desestructura primero
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`,
    { cache: 'no-store' }
  );
  const post = await res.json();

  return {
    title: post.title?.rendered || 'Noticia',
    description: post.excerpt?.rendered || '',
    openGraph: {
      title: post.title?.rendered,
      description: post.excerpt?.rendered,
      type: 'article',
      url: `/noticias/${id}`,
      images: [
        post.yoast_head_json?.og_image?.[0]?.url || '/default-og.jpg',
      ],
    },
  };
}

export default async function NoticiaPage({ params }) {
  const { id } = params; // ✅ también aquí
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`,
    { cache: 'no-store' }
  );

  if (!res.ok) return <p>No se encontró la noticia</p>;

  const data = await res.json();

  return (
    <article>
      <h1 dangerouslySetInnerHTML={{ __html: data.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
    </article>
  );
}
