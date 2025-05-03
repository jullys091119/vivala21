'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/noticias/search/search.module.css';
import Header from '@/app/components/Header/Header';
import TabNews from '@/app/components/TabNews/TabNews';
import LiveNews from '@/app/components/LiveNews/LiveNews';
import SubscribeCard from '@/app/components/SubscribeCard/SubscribeCard';
import PromoCards from '@/app/components/PromoCards/PromoCards';
import FooterPage from '@/app/components/Footer/Footer';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const SearchComponent = () => {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('s') || '');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [promoImage, setPromoImage] = useState('');

  const fetchMediaUrl = useCallback(async (mediaId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/media/${mediaId}`);
      const media = await response.json();
      return media.source_url;
    } catch (error) {
      console.error('Error fetching media:', error);
      return '';
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length === 0) return;

    setLoading(true);
    setError('');
    fetch(`https://api.vivalanoticia.mx/wp-json/wp/v2/posts?search=${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then(async (data) => {
        if (data.length > 0) {
          setSearchResults(data);
          const firstResult = data[0];

          // Verificamos si hay un mediaId para la imagen destacada
          const firstMediaId = firstResult.featured_media;
          if (firstMediaId) {
            // Usamos fetchMediaUrl para obtener la URL de la imagen
            const imageUrl = await fetchMediaUrl(firstMediaId);
            setPromoImage(imageUrl);  // Actualizamos la imagen
          }
        } else {
          setSearchResults([]);
          setPromoImage(''); // Limpiamos la imagen si no hay resultados
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al buscar noticias:', err);
        setError('Ocurrió un error al buscar noticias.');
        setLoading(false);
      });
  }, [searchQuery, fetchMediaUrl]);

  // Obtenemos el primer resultado después de que se actualicen los resultados
  const firstResult = searchResults[0];

  return (
    <>
      <Header />
      <div className={styles.debugContainer}>
        <div className={styles.layoutContainer}>
          <div className={styles.mainContent}>
            {loading ? (
              <div className={styles.loading}>Cargando noticias...</div>
            ) : error ? (
              <div className={styles.errorMessage}>{error}</div>
            ) : searchResults.length > 0 ? (
              <div className={styles.newsContainer}>
                {searchResults.map((noticia) => (
                  <div key={noticia.id} className={styles.newsCard}>
                    <Link href={`/noticias/${noticia.id}`}>
                      <h3
                        dangerouslySetInnerHTML={{ __html: noticia.title?.rendered || 'Sin título' }}
                        className={styles.newsCardTitle}
                      />
                    </Link>
                    <span className={styles.date}>{formatDate(noticia.date)}</span>
                    <p
                      className={styles.noticia}
                      dangerouslySetInnerHTML={{ __html: noticia.excerpt?.rendered || 'Sin resumen disponible.' }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.errorMessage}>
                No se encontraron resultados para "{searchQuery}".
              </div>
            )}
          </div>
          <div className={styles.sidebar}>
            <TabNews />
            <LiveNews />
            <SubscribeCard />
            {firstResult && promoImage && (
              <PromoCards
                title={firstResult.title?.rendered || 'Sin título'}
                image={promoImage}
                link={`/noticias/${firstResult.id}`}
              />
            )}
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default SearchComponent;
