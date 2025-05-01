// app/noticias/[id]/page.js
import { fetchNoticiaData } from '@/lib/fetchNoticia';
import NewsClient from '@/app/noticias/newsClient';

export async function generateStaticParams() {
  // Traemos los IDs de todas las noticias disponibles.
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts`);
  const posts = await res.json();

  // Generamos los parámetros de ruta estáticos para todas las noticias
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function NewsPage({ params }) {
  const { id } = params;

  // Usamos fetch para obtener los datos de la noticia con el ID
  const noticia = await fetchNoticiaData(id);

  return <NewsClient noticia={noticia} />;
}
