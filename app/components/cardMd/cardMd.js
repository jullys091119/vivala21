'use client';
import React from 'react';
import Link from 'next/link';
import styles from '@/app/components/cardMd/cardMd.module.css';
import IconsDate from '@/public/svg/icon-date.svg';
import AuthorIcon from '@/public/svg/icon-note.svg';
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
      <div className={styles.cardMdHero}>
        <Image
          className={styles.cardMdImg}
          src={imageUrl}
          alt={post.title?.rendered || "Imagen no disponible"}
          width={500} // Ajusta el ancho según lo necesites
          height={300} // Ajusta la altura según lo necesites
          layout="responsive" // Esto asegura que la imagen sea responsiva
        />
      </div>
      <div className={styles.cardMdContent}>
        <h3 className={styles.cardMdTitle} dangerouslySetInnerHTML={{ __html: limitTitle(post.title?.rendered) }} />
        <div className={styles.cardMdMeta}>
          <div className={styles.cardMdMetaItem}>
            <Image
              src={AuthorIcon}
              alt="Author icon"
              width={16} // Ajusta según el tamaño del ícono
              height={16} // Ajusta según el tamaño del ícono
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className={styles.cardMdMetaValue}>{post?._embedded?.author?.[0]?.name || "Anónimo"}</p>
          </div>
          <div className={styles.cardMdMetaItem}>
            <Image
              src={IconsDate}
              alt="Date icon"
              width={16} // Ajusta según el tamaño del ícono
              height={16} // Ajusta según el tamaño del ícono
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
