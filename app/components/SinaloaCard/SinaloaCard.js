"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/components/SinaloaCard/SinaloaCard.module.css";
import CardLg from "@/app/components/cardLg/CardLg";

const SinaloaNews = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [mainNews, setMainNews] = useState(null);
  const [rightColumnNews, setRightColumnNews] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  const limitTitle = (title) => {
    if (!title) return "";
    return title.length > 60 ? title.substring(0, 60) + "..." : title;
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (!apiUrl) throw new Error("API URL no está definida.");

        const response = await fetch(
          `${apiUrl}wp/v2/posts?_embed&categories_slug=sinaloa&per_page=4&offset=1`
        );
        if (!response.ok) throw new Error(`Error HTTP! Status: ${response.status}`);

        const data = await response.json();
        setNews(data);
        setMainNews(data[0]);
        setRightColumnNews(data.slice(1, 4));
      } catch (err) {
        console.error("Error al obtener noticias:", err);
        setError("Error cargando noticias.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [apiUrl]); // Asegúrate de agregar 'apiUrl' como dependencia si cambia

  if (loading) return <div className={styles.loading}>Cargando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.nacionalCardContainer}>
      {mainNews && (
        <div className={styles.mainContent}>
          <CardLg
            currentShow={mainNews}
            category="SINALOA"
            placeholderImage="/images/custom-placeholder.jpg"
            altText={mainNews.title?.rendered || "Noticias Sinaloa"}
          />
        </div>
      )}

      <div className={styles.sideContent}>
        {rightColumnNews.map((article, index) => (
          <Link key={article.id} href={`/noticias/${article.id}`} className={`${styles.sideCard} ${index < rightColumnNews.length - 1 ? styles.mb36 : ""}`}>
            <Image
              src={article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/placeholder.jpg"}
              alt={article.title?.rendered || "Imagen de noticia"}
              width={320}
              height={137}
              className={styles.sideCardImage}
              loading="lazy"
            />
            <div className={styles.sideCardContent}>
              <p className={styles.newsCategoryName}>SINALOA</p>
              <p className={styles.title}>{limitTitle(article.title.rendered)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SinaloaNews;
