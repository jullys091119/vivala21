'use client';
import React from 'react';
import Link from 'next/link';
import styles from '@/app/components/cardMd/cardMd.module.css';
import IconsDate from '@/app/assets/svg/icon-date.svg';
import AuthorIcon from '@/app/assets/svg/icon-note.svg';
import Image from 'next/image';

const CardMd = ({ post, classCss = '' }) => {
  console.log(post?.image ?? "No hay imagen disponible", "post");

  if (!post || !post.id) {
    return <p className={styles.errorMessage}>No se encontraron datos.</p>;
  }

  const stripHtml = (html) => html?.replace(/<[^>]*>/g, "") || "";

  const formatDate = (date) => {
    if (!date) return "Fecha desconocida";
    return new Date(date).toLocaleDateString("es-MX", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const limitTitle = (title) => {
    const cleanTitle = stripHtml(title);
    return cleanTitle.length > 60 ? cleanTitle.slice(0, 60) + "..." : cleanTitle;
  };

  // Se prioriza post.image si existe, luego se usa la imagen incrustada o la predeterminada
  const imageUrl = post.image || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/assets/img/no-image.png';

  return (
    <Link href={`/noticias/${post.id}`} className={`${styles.cardMd} ${classCss}`}>
      <img
        className={styles.cardMdImg}
        src={imageUrl}
        alt={post.title?.rendered || "Imagen no disponible"}
      />
      <div className={styles.cardMdContent}>
        <h3 className={styles.cardMdTitle} dangerouslySetInnerHTML={{ __html: limitTitle(post.title?.rendered) }} />
        <div className={styles.cardMdMeta}>
          <div className={styles.cardMdMetaItem}>
            <Image
              src={AuthorIcon}
              alt="Author icon"
              color='white'
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className={styles.cardMdMetaValue}>{post?._embedded?.author?.[0]?.name || "Anónimo"}</p>
          </div>
          <div className={styles.cardMdMetaItem}>
            <Image
              src={IconsDate}
              alt="Date icon"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className={styles.cardMdMetaValue}>{formatDate(post?.date)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardMd;
