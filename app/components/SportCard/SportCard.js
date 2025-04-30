"use client";

import { useEffect, useState } from "react";
import styles from "../styles/DeportesCard.module.css";
import Link from "next/link";
import Image from "next/image"; // Importa el componente Image

const DeportesCard = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts?categories=12&_embed`
        );
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.error("Error obteniendo artículos:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const stripHtml = (html) => (html ? html.replace(/<[^>]*>/g, "") : "");
  const truncateText = (text, maxLength) =>
    text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  const decodeHtmlEntities = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  if (loading) {
    return (
      <div className={styles.loadingSkeleton}>
        <div className={styles.skeletonHero}></div>
        <div className={styles.skeletonBody}></div>
      </div>
    );
  }

  return (
    <div className={styles.deportesCardContainer}>
      <div className={styles.mainContent}>
        <Link href={`/noticias/${articles[0]?.id}`} className={styles.mainContentLink}>
          <div className={styles.mainContentHero}>
            <Image
              src={articles[0]?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""}
              alt={articles[0]?.title?.rendered}
              width={500}
              height={300}
              priority
            />
            <div className={styles.cardImageOverlay}></div>
            <p className={styles.heroNewsCategoryName}>deportes</p>
            <p className={styles.heroTitle}>
              {truncateText(decodeHtmlEntities(articles[0]?.title?.rendered), 140)}
            </p>
          </div>
          <div className={styles.mainContentBody}>
            {stripHtml(articles[0]?.excerpt?.rendered).substring(0, 100) + "..."}
          </div>
          <div className={styles.mainContentFooter}>
            <div className={styles.authorInfo}>
              <p>{articles[0]?.author || "Autor desconocido"}</p>
              <div className={styles.dateInfo}>
                <p>{articles[0]?.date || "Fecha desconocida"}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className={styles.sideContent}>
        {articles.slice(1, 4).map((article, index) => (
          <div key={article.id} className={`${styles.sideCard} ${index < 2 ? styles.mb35 : ""}`}>
            <Link href={`/noticias/${article.id}`} className={styles.sideCardLink}>
              <p className={styles.newsCategoryName}>deportes</p>
              <p className={styles.title}>{article.title?.rendered}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeportesCard;
