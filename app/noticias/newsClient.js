"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/app/noticias/[id]/pages.module.css';
import TabNews from '@/app/components/TabNews/TabNews';
import LiveNews from '@/app/components/LiveNews/LiveNews';
import SubscribeCard from '@/app/components/SubscribeCard/SubscribeCard';
import CommentsBox from '@/app/components/commentsBox/commentsBox';

export default function NewsClient({ noticia }) {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(process.env.NEXT_PUBLIC_SITE_URL + window.location.pathname);
  }, []);


  if (!noticia) return <div>Cargando noticia...</div>;

  const yoast = noticia?.yoast_head_json || {};
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const shareTitle = encodeURIComponent(noticia?.title?.rendered || '');
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&title=${shareTitle}`,
    telegram: `https://telegram.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${shareTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${shareTitle}%20${encodeURIComponent(currentUrl)}`,
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
  const featuredMedia = noticia._embedded?.['wp:featuredmedia']?.[0];

  return (
    <div className={styles.debugContainer}>
      <div className={styles.layoutContainer}>
        <div className={styles.mainContent}>
          <div className={styles.singleNewsContainer}>
            <h1 className={styles.newsTitle} dangerouslySetInnerHTML={{ __html: noticia.title?.rendered }} />
            <div className={styles.metaItems}>
              <span className={styles.metaItem}>{author?.name || 'Autor no disponible'}</span>
              <span className={styles.metaItem}>{formatDate(noticia.date)}</span>
            </div>

            {featuredMedia?.source_url && (
              <div className={styles.featuredImage}>
                <Image
                  src={featuredMedia.source_url}
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
                <img
                  src={author.avatar_urls[96]}
                  alt={author.name || 'Autor'}
                  className={styles.authorImage}
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
                    <img src={`/images/${platform}.svg`} alt={`Share on ${platform}`} className={styles.shareIcon} />
                  </a>
                ))}
                <button onClick={copyLink} className={styles.shareIcon}>
                  <img src="/images/link.svg" alt="Copy Link" />
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
  );
}
