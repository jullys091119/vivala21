import NewsClient from '../newsClient';

export const dynamic = 'force-dynamic';  // Esto fuerza la renderización dinámica en el servidor

export async function generateMetadata({ params }) {
  const { id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`, { cache: 'no-store' });
  const post = await res.json();

  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/noticias/${id}`;
  export function generateMetadata({ params }) {
    const { id } = params;

    return fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`, { cache: 'no-store' })
      .then(res => res.json())
      .then(post => {
        const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/noticias/${id}`;

        // Función para limpiar caracteres especiales y etiquetas HTML
        const cleanText = text => text?.replace(/<[^>]*>/g, '').replace(/&[#\w]+;/g, '').trim() || '';

        return {
          title: cleanText(post.title?.rendered) || 'Noticia',
          description: cleanText(post.excerpt?.rendered),
          openGraph: {
            title: cleanText(post.title?.rendered),
            description: cleanText(post.excerpt?.rendered),
            type: 'article',
            url: canonicalUrl,
            images: post.jetpack_featured_media_url ? [post.jetpack_featured_media_url] : [],
          },
          twitter: {
            card: 'summary_large_image',
            title: cleanText(post.title?.rendered),
            description: cleanText(post.excerpt?.rendered),
            image: post.jetpack_featured_media_url || '',
          },
          canonical: canonicalUrl,
        };
      })
      .catch(err => {
        console.error('Error generando metadata:', err);
        return {
          title: 'Noticia no encontrada',
          description: '',
          openGraph: { title: 'Noticia no encontrada', description: '', type: 'article', url: '', images: [] },
          twitter: { card: 'summary_large_image', title: 'Noticia no encontrada', description: '', image: '' },
          canonical: '',
        };
      });
  }

}


export default async function NoticiaPage({ params }) {
  const { id } = params; // ✅ También aquí
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`,
    { cache: 'no-store' }
  );

  if (!res.ok) return <p>No se encontró la noticia</p>;

  const noticia = await res.json();

  return <NewsClient noticia={noticia} />;
}
