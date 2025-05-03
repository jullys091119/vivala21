'use client';
import React from 'react';
import Link from 'next/link';
import styles from '@/app/components/cardLg/cardLg.module.css';
import IconsDate from '@/public/svg/icon-date.svg';
import AuthorIcon from '@/public/svg/icon-note.svg';
import Image from 'next/image';

const CardLg = ({ currentShow, category = "Internacional", placeholderImage, altText, classCss }) => {
  const stripHtml = (html) => html?.replace(/<[^>]*>/g, "") || "";

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("es-MX", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const limitTitle = (title) => title?.length > 150 ? title.substring(0, 150) + '...' : title;
  console.log(currentShow.title.rendered, "currentShow");


  const imageUrl = currentShow?._embedded?.['wp:featuredmedia']?.[0]?.source_url || placeholderImage;

  return (
    <Link href={`/noticias/${currentShow?.id}`} className={`${styles.cardLg} ${classCss}`}>
      <div className={styles.cardLg__hero}>
        <Image
          className={styles.cardLgImg}
          src={imageUrl}
          alt={altText}
          layout="responsive"
          width={0}
          height={0}
        />
        <div className={styles.cardLgTitleWrp}>
          <p className={styles.cardLgCategory}>{category}</p>
          <p className={styles.cardLgTitle}>{limitTitle(currentShow.title.rendered)}</p>
        </div>

      </div>
      <div className={styles.cardLgBody}>
        <div className={styles.cardLgMeta}>
          <div className={styles.cardLgContent} dangerouslySetInnerHTML={{ __html: stripHtml(limitTitle(currentShow?.excerpt?.rendered)) }} />
          <div className={styles.containerAuthorDate}>
            <div className={styles.cardLgMetaItem}>
              <Image
                src={AuthorIcon}
                alt="Author icon"
                width={16} // Ajusta según el tamaño del ícono
                height={16} // Ajusta según el tamaño del ícono
              />
              <p className={styles.cardLg__metaValue}>{currentShow?._embedded?.author?.[0]?.name || "Anónimo"}</p>
            </div>
            <div className={styles.cardLgMetaItem}>
              <Image
                src={IconsDate}
                alt="Date icon"
                width={16} // Ajusta según el tamaño del ícono
                height={16} // Ajusta según el tamaño del ícono
              />
              <p className={styles.cardLg__metaValue}>{formatDate(currentShow?.date)}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardLg;
