// app/noticias/[id]/page.js
export const dynamic = 'force-dynamic';

import placeholder from '@/app/assets/images/logo.png';
import React from 'react';
import Image from 'next/image';
import ShareButton from '@/app/components/ShareButton/ShareButton';
import styles from './pages.module.css';
import CommentsBox from '@/app/components/commentsBox/commentsBox';
import TabNews from '@/app/components/TabNews/TabNews';
import LiveNews from '@/app/components/LiveNews/LiveNews';
import SubscribeCard from '@/app/components/SubscribeCard/SubscribeCard';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

function formatDate(dateString) {
  return format(new Date(dateString), "d 'de' MMMM yyyy", { locale: es });
}

export async function generateMetadata({ params }) {
  const { id } = params;

  const res = await fetch(`https://api.vivalanoticia.mx/wp-json/wp/v2/posts/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return {
      title: 'Noticia no encontrada',
      description: 'No se pudo cargar la noticia',
    };
  }

  const noticia = await res.json();

  const cleanTitle = noticia.title?.rendered?.replace(/<[^>]*>/g, '') || 'Sin título';
  const cleanExcerpt = noticia.excerpt?.rendered?.replace(/<[^>]*>/g, '') || 'Sin descripción';
  const image = noticia.jetpack_featured_media_url || 'https://vivala21.vercel.app/default.jpg';

  return {
    title: cleanTitle,
    description: cleanExcerpt,
    openGraph: {
      title: cleanTitle,
      description: cleanExcerpt,
      url: `https://vivala21.vercel.app/noticias/${id}`,
      type: 'article',
      siteName: 'Viva la 21',
      images: [{ url: image, alt: cleanTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description: cleanExcerpt,
      images: [image],
    },
  };
}

export default async function NoticiaPage({ params }) {
  const res = await fetch(`https://api.vivalanoticia.mx/wp-json/wp/v2/posts/${params.id}?_embed`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return <div>No se pudo cargar la noticia.</div>;
  }

  const noticia = await res.json();
  console.log(noticia);
  const author = noticia._embedded?.author?.[0];
  const featuredImage = noticia.jetpack_featured_media_url || '/images/default-image.jpg';

  const shareUrl = `https://vivala21.vercel.app/noticias/${params.id}`;
  const cleanTitle = noticia.title?.rendered?.replace(/<[^>]*>/g, '') || 'Sin título';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${cleanTitle}`,
    telegram: `https://telegram.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${cleanTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${cleanTitle}%20${encodeURIComponent(shareUrl)}`,
  };



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
                <ShareButton />
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
