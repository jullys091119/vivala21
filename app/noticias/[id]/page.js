import NewsClient from '../newsClient'; // Componente que renderiza la noticia

// Función para limpiar texto
const cleanText = (text) => {
  if (!text) return 'Descripción no disponible';
  return text.replace(/<[^>]*>/g, '').replace(/&[#\w]+;/g, '').trim();
};

// Obtener datos de la API
const getNoticia = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts/${id}?_embed`, {
    next: { revalidate: 60 }, // (opcional) ISR: revalida cada 60 segundos
  });

  if (!res.ok) return null;

  return res.json();
};

// Render de la página
export default async function NoticiaPage({ params }) {
  const noticia = await getNoticia(params.id);
  if (!noticia) return <div>No se encontró la noticia.</div>;

  return <NewsClient noticia={noticia} />;
}
