'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SimpleCard from '@/app/components/SimpleCard/SimpleCard';
import Image from 'next/image'; // Importar Image de Next.js
import styles from '@/app/components/EspectaculoCol/EspectaculoCol.module.css';

const Espectaculos = () => {
  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState([]);
  const [currentShow, setCurrentShow] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('/api/espectaculos');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setShows(data);
        setCurrentShow(data[0]);
      } catch (error) {
        console.error('Error fetching shows:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  const stripHtml = (html) => html?.replace(/<[^>]*>/g, '') || '';

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div>
      <div className={styles.espectaculosCardContainer}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <span>Cargando...</span>
          </div>
        ) : (
          <div className={styles.mainContent}>
            <Link href={`/noticias/${currentShow?.id}`} className={styles.mainContentLink}>
              <div className={styles.mainContentHero}>
                {/* Reemplazar <img> por <Image /> */}
                <Image
                  src={currentShow?._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '/assets/images/placeholder.jpg'}
                  alt="espectaculos"
                  className={styles.heroImage}
                  width={1200}   // Ajusta el tamaño según sea necesario
                  height={675}   // Ajusta el tamaño según sea necesario
                  loading="lazy" // Lazy loading para mejorar el rendimiento
                />
                <div className={styles.cardImageOverlay}></div>
                <p className={styles.heroNewsCategoryName}>espectaculo</p>
                <p className={styles.heroTitle} dangerouslySetInnerHTML={{ __html: currentShow?.title?.rendered }} />
              </div>
              <div className={styles.mainContentBody} dangerouslySetInnerHTML={{ __html: stripHtml(currentShow?.excerpt?.rendered) }} />
              <div className={styles.authorInfo}>
                <p>{currentShow?._embedded?.author?.[0]?.name || 'Anónimo'}</p>
                <div className={styles.dateInfo}>
                  <p>{formatDate(currentShow?.date)}</p>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>

      {shows.slice(1, 3).map((item) => (
        <SimpleCard
          key={item.id}
          title={item.title.rendered}
          category="espectaculo"
          id={item.id}
          color="#704DAB"
          className={styles.simpleCardDesktop}
        />
      ))}

      <div className={styles.simpleCardMobile}>
        {shows.slice(1, 3).map((item) => (
          <SimpleCard
            key={item.id}
            title={item.title.rendered}
            category="espectaculo"
            id={item.id}
            color="#704DAB"
          />
        ))}
      </div>
    </div>
  );
};

export default Espectaculos;
