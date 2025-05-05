// app/categorias/[slug]/page.js
"use client";
import { useState, useEffect, useCallback } from 'react';
import { use } from 'react';  // Importar `use` de React para acceder a `params` correctamente
import styles from './page.module.css';
import Pagination from '@/app/components/Pagination/Pagination';
import TabNews from '@/app/components/TabNews/TabNews';
import LiveNews from '@/app/components/LiveNews/LiveNews';
import SubscribeCard from '@/app/components/SubscribeCard/SubscribeCard';
import Image from 'next/image';
import Header from '@/app/components/Header/Header';
import MobileHeader from '@/app/components/HeaderMobile/HeaderMobile';

const News = ({ params }) => {
  const slug = use(params).slug;  // Desempaquetamos `params` usando `use()`
  const [loading, setLoading] = useState(true);
  const [noticias, setNoticias] = useState([]);
  const [totalNoticias, setTotalNoticias] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const [error, setError] = useState(null);
  const itemsPorPagina = 10;

  const fetchNoticias = useCallback(async () => {
    if (!slug) return;  // Asegúrate de que `slug` no sea `undefined`

    setLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

      // Obtener el total de noticias
      const responseTotal = await fetch(`${baseUrl}wp/v2/posts?categories_slug=${slug}&_embed&per_page=1`);
      if (!responseTotal.ok) throw new Error(`Error al obtener total: ${responseTotal.status}`);
      setTotalNoticias(parseInt(responseTotal.headers.get('X-WP-Total'), 10));

      // Obtener las noticias para la categoría específica
      const response = await fetch(`${baseUrl}wp/v2/posts?categories_slug=${slug}&_embed&per_page=${itemsPorPagina}&page=${paginaActual}`);
      if (!response.ok) throw new Error(`Error al obtener noticias: ${response.status}`);
      const data = await response.json();
      setNoticias(data);
    } catch (error) {
      setError(error.message);
      setNoticias([]);
    } finally {
      setLoading(false);
    }
  }, [slug, paginaActual]);

  useEffect(() => {
    fetchNoticias();
  }, [fetchNoticias]);

  const handlePageChange = (page) => {
    setPaginaActual(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!slug) {
    return <p>No se ha especificado una categoría válida.</p>;
  }

  return (
    <>
      <Header />
      <MobileHeader />
      <div className={styles.debugContainer}>
        <div className={styles.layoutContainer}>
          <div className={styles.mainContent}>
            {error && <p className={styles.errorMessage}>Error: {error}</p>}

            {!loading && totalNoticias > 0 && (
              <Pagination
                totalItems={totalNoticias}
                itemsPerPage={itemsPorPagina}
                maxVisiblePages={7}
                onPageChange={handlePageChange}
              />
            )}

            <div className={styles.widgetContent}>
              <div className={styles.newsContainer}>
                {!loading ? (
                  noticias.map((noticia) => (
                    <div key={noticia.id} className={styles.newsCard}>
                      <div className={styles.itemInner}>
                        {noticia._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                          <a href={`/noticias/${noticia.id}`} className={styles.itemThumbnail}>
                            <Image
                              src={noticia._embedded['wp:featuredmedia'][0].source_url}
                              alt={noticia.title.rendered}
                              width={500}
                              height={300}
                              layout="responsive"
                            />
                          </a>
                        )}
                        <div className={styles.itemContent}>
                          <div className={styles.itemLabels}>
                            <a href={`/categorias/${slug}`}>{slug.toUpperCase()}</a>
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
              <Pagination
                totalItems={totalNoticias}
                itemsPerPage={itemsPorPagina}
                maxVisiblePages={7}
                onPageChange={handlePageChange}
              />
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
    </>
  );
};

export default News;
