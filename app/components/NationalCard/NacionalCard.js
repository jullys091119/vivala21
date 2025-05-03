import NacionalCard from "@/app/components/NationalCard/NacionalCard";

const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
const categoriaId = 11; // Usa el ID correcto de tu categoría "nacional"

async function getNews() {
  try {
    const response = await fetch(`${baseUrl}wp/v2/posts?categories=${categoriaId}&_embed&per_page=5`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error al obtener noticias: ${response.status}`);
    }

    const data = await response.json();
    return {
      mainNews: data[0] || null,
      articles: data.slice(1) || [],
      error: null,
    };
  } catch (error) {
    return {
      mainNews: null,
      articles: [],
      error: error.message,
    };
  }
}

export default async function HomePage() {
  const { mainNews, articles, error } = await getNews();

  return (
    <main>
      <NacionalCard
        mainNews={mainNews}
        articles={articles}
        loading={false}
        error={error}
      />
    </main>
  );
}
