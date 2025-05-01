// pages/noticias/[id].js
import { fetchNoticiaData } from '@/lib/fetchNoticia';
import NewsClient from '@/app/noticias/newsClient';

export async function getStaticPaths() {
  // Traemos todos los IDs de las noticias desde la API
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts`);
  const posts = await res.json();

  // Generamos las rutas para todas las noticias
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',  // 'blocking' asegura que las páginas se generen en el primer acceso si no existen aún
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const noticia = await fetchNoticiaData(id);

  return {
    props: {
      noticia,
    },
    revalidate: 60,  // Se vuelve a generar la página después de 60 segundos si hay cambios
  };
}

export default function NewsPage({ noticia }) {
  return <NewsClient noticia={noticia} />;
}
