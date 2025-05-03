// Este es un Server Component
async function getRelatedNews(query) {
  if (!query) return [];

  const res = await fetch(`https://api.vivalanoticia.mx/wp-json/wp/v2/posts?search=${query}`, {
    cache: 'no-store', // Evita la cache para obtener resultados en cada búsqueda
  });

  if (!res.ok) {
    throw new Error('Error al obtener los resultados.');
  }

  return res.json();
}

export default async function RelatedSearchResults({ search }) {
  const noticias = await getRelatedNews(search);

  if (!search) return null;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Resultados relacionados con: "{search}"</h3>
      {noticias.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <ul>
          {noticias.map((n) => (
            <li key={n.id}>
              <a href={`/noticias/${n.id}`} dangerouslySetInnerHTML={{ __html: n.title.rendered }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
