"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head'; // Importamos Head para manejar los metadatos
import styles from '@/app/noticias/[id]/pages.module.css';
import TabNews from '@/app/components/TabNews/TabNews';
import LiveNews from '@/app/components/LiveNews/LiveNews';
import SubscribeCard from '@/app/components/SubscribeCard/SubscribeCard';
import CommentsBox from '@/app/components/commentsBox/commentsBox';

export default function NewsClient({ noticia }) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [metaData, setMetaData] = useState({
    title: '',
    description: '',
    image: '',
    url: ''
  });

  useEffect(() => {
    // Se obtiene la URL actual para la página
    setCurrentUrl(process.env.NEXT_PUBLIC_SITE_URL + window.location.pathname);

    // Configurar los metadatos de la noticia
    if (noticia) {
      setMetaData({
        title: noticia.title?.rendered || 'Sin título',
        description: noticia.excerpt?.rendered || 'Sin descripción',
        image: noticia.jetpack_featured_media_url || '/images/default-image.jpg',
        url: process.env.NEXT_PUBLIC_SITE_URL + window.location.pathname
      });
    }
  }, [noticia]);

  if (!noticia) return <div>Cargando noticia...</div>;

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&title=${metaData.title}`,
    telegram: `https://telegram.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${metaData.title}`,
    whatsapp: `https://api.whatsapp.com/send?text=${metaData.title}%20${encodeURIComponent(currentUrl)}`,
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert('Enlace copiado al portapapeles');
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const author = noticia._embedded?.author?.[0];
  const featuredImage = noticia.jetpack_featured_media_url || '/images/default-image.jpg';

  return (
    <>
      <Head>
        {/* Metadatos Open Graph */}
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.image} />
        <meta property="og:url" content={metaData.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaData.title} />
        <meta name="twitter:description" content={metaData.description} />
        <meta name="twitter:image" content={metaData.image} />
      </Head>

      <div className={styles.debugContainer}>
        <div className={styles.layoutContainer}>
          <div className={styles.mainContent}>
            <div className={styles.singleNewsContainer}>
              <h1 className={styles.newsTitle} dangerouslySetInnerHTML={{ __html: noticia.title?.rendered }} />
              <div className={styles.metaItems}>
                <span className={styles.metaItem}>{author?.name || 'Autor no disponible'}</span>
                <span className={styles.metaItem}>{formatDate(noticia.date)}</span>
              </div>

              {featuredImage && (
                <div className={styles.featuredImage}>
                  <Image
                    src={featuredImage}
                    alt={noticia.title?.rendered || 'Imagen destacada'}
                    width={1200}
                    height={630}
                    layout="responsive"
                  />
                </div>
              )}

              <div className={styles.newsReader}>
                <button className={styles.listenButton}>Escuchar la entrada</button>
                <div className={styles.shortDescription} dangerouslySetInnerHTML={{ __html: noticia.excerpt?.rendered }} />
              </div>

              <div className={styles.newsContent} dangerouslySetInnerHTML={{ __html: noticia.content?.rendered }} />

              <div className={styles.newsAuthor}>
                {author?.avatar_urls?.[96] && (
                  <Image
                    src={author.avatar_urls[96]}
                    alt={author.name || 'Autor'}
                    className={styles.authorImage}
                    width={96}
                    height={96}
                  />
                )}
                <p className={styles.newsAuthorName}>
                  AUTOR: <span>{author?.name || 'Nombre no disponible'}</span>
                </p>
              </div>

              <div className={styles.socialShare}>
                <p>Comparte la noticia</p>
                <div className={styles.socialShareIcons}>
                  {Object.entries(shareLinks).map(([platform, url]) => (
                    <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={`/images/${platform}.svg`}
                        alt={`Compartir en ${platform}`}
                        width={24}
                        height={24}
                        className={styles.shareIcon}
                      />
                    </a>
                  ))}
                  <button onClick={copyLink} className={styles.shareIcon}>
                    <Image src="/images/link.svg" alt="Copiar enlace" width={24} height={24} />
                  </button>
                </div>
              </div>

              <CommentsBox postId={noticia.id} />
            </div>
          </div>

          <div className={styles.sidebarContent}>
            <TabNews />
            <LiveNews />
            <SubscribeCard />
          </div>
        </div>
      </div>
    </>
  );
}
