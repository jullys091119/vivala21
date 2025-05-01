// app/noticias/[id]/page.jsx
import NewsClient from '../newsClient';

export const dynamic = 'force-dynamic'; // Para que siempre se renderice dinámicamente
export const revalidate = 0;  // No hacer revalidación automática

// Generar parámetros estáticos para las rutas dinámicas
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts`);
  const posts = await res.json();

  return posts.map(post => ({
    id: post.id.toString(),  // Los IDs de los posts como parámetros
  }));
}

// Función para limpiar texto (eliminar etiquetas HTML y fragmentos extraños como "+ []")
const cleanText = (text) => {
  if (!text) return 'Descripción no disponible';

  // Limpiar etiquetas HTML y entidades de caracteres
  let cleanedText = text.replace(/<[^>]*>/g, '').replace(/&[#\w]+;/g, '').trim();

  // Eliminar fragmentos no deseados como "+ []"
  cleanedText = cleanedText.replace(/\+ \[\]/g, '').replace(/\+/g, '').trim();

  // Evitar cortar el texto antes de tiempo, recortando a un límite de caracteres
  const maxLength = 160;
  if (cleanedText.length > maxLength) {
    cleanedText = cleanedText.substring(0, maxLength) + '...';
  }

  return cleanedText;
};


// Generación de metadatos para cada noticia
export async function generateMetadata({ params }) {
  const { id } = params;

  // Llamada a la API de WordPress para obtener los datos del post
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`,  // Endpoint de la noticia con _embed
    { cache: 'no-store' }
  );

  if (!res.ok) {
    return {
      title: 'Noticia no encontrada',
      description: 'La noticia solicitada no está disponible.',
    };
  }

  const post = await res.json();

  // Generación de la URL canónica
  const canonicalUrl = `https://vivala21-j4ml.vercel.app/noticias/${id}`;

  // Limpiar y obtener el título y la descripción
  const title = cleanText(post.title?.rendered);
  const description = cleanText(post.excerpt?.rendered);  // Usamos el excerpt o content si es necesario
  const image = post.jetpack_featured_media_url || 'default-image-url.jpg'; // Imagen por defecto si no hay

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonicalUrl,
      images: image ? [{ url: image, secure_url: image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// Página dinámica para mostrar la noticia
export default async function NoticiaPage({ params }) {
  const { id } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`,  // Endpoint para obtener la noticia
    { cache: 'no-store' }
  );

  if (!res.ok) return <p>No se encontró la noticia</p>;

  const noticia = await res.json();

  // Renderizamos el componente `NewsClient` pasando la noticia obtenida
  return (
    <div>
      <NewsClient noticia={noticia} />
    </div>
  );
}
