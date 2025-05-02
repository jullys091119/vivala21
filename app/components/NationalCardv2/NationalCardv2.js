import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';  // Usamos useParams en lugar de useRouter
import styles from '@/app/components/NationalCardv2/NationalCardv2.module.css';
import Pagination from '@/app/components/Pagination/Pagination';
import TabNews from '@/app/components/TabNews/TabNews';
import LiveNews from '@/app/components/LiveNews/LiveNews';
import SubscribeCard from '@/app/components/SubscribeCard/SubscribeCard';

const News = () => {
  const [loading, setLoading] = useState(true);
  const [noticias, setNoticias] = useState([]);
  const [totalNoticias, setTotalNoticias] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 4;

  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  const { categorySlug } = useParams();  // Usamos useParams para obtener el categorySlug

  // Aquí ajustamos el fetch a tu nuevo endpoint
  const fetchNoticias = useCallback(async () => {
    if (!categorySlug) return;  // Asegúrate de que categorySlug esté definido antes de hacer la solicitud

    try {
      // Endpoint actualizado con la categoría y paginación
      const endpoint = `${apiUrl}wp/v2/posts?_embed&categories=11&per_page=${itemsPorPagina}&offset=${(paginaActual - 1) * itemsPorPagina}`;
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();

      // Aquí calculamos el total de noticias
      const totalResponse = await fetch(`${apiUrl}wp/v2/posts?categories=11&_embed`);
      if (!totalResponse.ok) throw new Error(`Error: ${totalResponse.status}`);
      const totalData = await totalResponse.json();
      setTotalNoticias(totalData.length);

      setNoticias(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, categorySlug, paginaActual, itemsPorPagina]);

  useEffect(() => {
    if (categorySlug) {
      fetchNoticias();
    }
  }, [categorySlug, fetchNoticias]);

  return (
    <div className={styles.debugContainer}>
      <div className={styles.layoutContainer}>
        <div className={styles.mainContent}>
          {!loading && totalNoticias > 0 && (
            <Pagination totalItems={totalNoticias} itemsPerPage={itemsPorPagina} maxVisiblePages={7} onPageChange={setPaginaActual} />
          )}

          <div className={styles.widgetContent}>
            <div className={styles.newsContainer}>
              {!loading ? (
                noticias.map((noticia) => (
                  <div key={noticia.id} className={styles.newsCard}>
                    <div className={styles.itemInner}>
                      {noticia._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                        <a href={`/noticias/${noticia.id}`} className={styles.itemThumbnail}>
                          <img src={noticia._embedded['wp:featuredmedia'][0].source_url} alt={noticia.title.rendered} />
                        </a>
                      )}
                      <div className={styles.itemContent}>
                        <div className={styles.itemLabels}>
                          <a href={`/categorias/${categorySlug}`}>{categorySlug.toUpperCase()}</a>
                        </div>
                        <h3 className={styles.itemTitle}>
                          <a href={`/noticias/${noticia.id}`} dangerouslySetInnerHTML={{ __html: noticia.title.rendered }} />
                        </h3>
                        <div className={styles.metaItems}>
                          <span className={styles.metaItem}>{noticia._embedded?.author?.[0]?.name}</span>
                          <span className={styles.metaItem}>{new Date(noticia.date).toLocaleDateString('es-ES')}</span>
                        </div>
                        <div className={styles.itemSnippet} dangerouslySetInnerHTML={{ __html: noticia.excerpt.rendered }} />
                        <a className={styles.itemReadMore} href={`/noticias/${noticia.id}`}>Leer más</a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Cargando noticias...</p>
              )}
            </div>
          </div>

          {!loading && totalNoticias > 0 && (
            <Pagination totalItems={totalNoticias} itemsPerPage={itemsPorPagina} maxVisiblePages={7} onPageChange={setPaginaActual} />
          )}
        </div>

        <div className={styles.sidebarContent}>
          <div className={styles.stickySidebar}>
            <TabNews />
            <LiveNews />
            <SubscribeCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
