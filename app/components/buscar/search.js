'use client'; // Asegura que el componente se ejecute en el cliente
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '@/app/components/buscar/search.module.css'; // Importando el CSS modular

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();
  const query = searchParams.get('s') || '';

  const config = {
    wordpressApiUrl: process.env.NEXT_PUBLIC_WORDPRESS_API_URL, // Variable de entorno pública
  };

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]); // Se ejecuta cuando cambia el query

  const performSearch = async (query) => {
    if (!query) return;

    setLoading(true);
    setSearchQuery(query);

    try {
      const response = await fetch(
        `${config.wordpressApiUrl}wp/v2/search?search=${encodeURIComponent(query)}&_embed=1`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.debugContainer}>
      <div className={styles.layoutContainer}>
        <div className={styles.mainContent}>
          {!loading ? (
            <div className={`${styles.widgetContent} ${styles.feedWidgetContent}`}>
              <div className={styles.newsContainer}>
                {searchResults.map((noticia) => {
                  const date = noticia._embedded?.self?.[0]?.date || 'Fecha desconocida';
                  const excerpt = noticia._embedded?.self?.[0]?.excerpt?.rendered || '';

                  return (
                    <div key={noticia.id} className={styles.newsCard}>
                      <div className={styles.itemInner}>
                        <div className={styles.itemContent}>
                          <h3 className={styles.itemTitle}>
                            <a href={`/noticias/${noticia.id}`}>
                              {noticia.title.rendered}
                            </a>
                          </h3>
                          <div className={styles.metaItems}>
                            <span className={styles.metaItemDate}>
                              <i className="fa fa-clock-o"></i> {formatDate(date)}
                            </span>
                          </div>
                          <div className={styles.itemSub}>
                            <div
                              className={styles.itemSnippet}
                              dangerouslySetInnerHTML={{ __html: excerpt }}
                            ></div>
                            <div className={styles.itemReadmoreWrapper}>
                              <a className={styles.itemReadmore} href={`/noticias/${noticia.id}`}>
                                Leer más
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className={styles.loading}>Cargando noticias...</div>
          )}

          {!loading && searchResults.length === 0 && (
            <div className={styles.errorMessage}>
              No se encontraron resultados para "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
