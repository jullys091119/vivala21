'use client';
import React from 'react';
import Link from 'next/link';
import styles from '@/app/components/cardLg/cardLg.module.css';
import IconsDate from '@/app/assets/svg/icon-date.svg';
import AuthorIcon from '@/app/assets/svg/icon-note.svg';
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

  return (
    <Link href={`/noticias/${currentShow?.id}`} className={`${styles.cardLg} ${classCss}`}>
      <div className={styles.cardLg__hero}>
        <img
          className={styles.cardLg__img}
          src={currentShow?._embedded?.['wp:featuredmedia']?.[0]?.source_url || placeholderImage}
          alt={altText}
        />
        <div className={styles.cardLg__titleWrp}>
          <p className={styles.cardLgCategory}>{category}</p>
          <p className={styles.cardLg__title} dangerouslySetInnerHTML={{ __html: limitTitle(currentShow?.title?.rendered) }} />
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
              />
              <p className={styles.cardLg__metaValue}>{currentShow?._embedded?.author?.[0]?.name || "Anónimo"}</p>
            </div>
            <div className={styles.cardLgMetaItem}>
              <Image
                src={IconsDate}
                alt="Date icon"
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
