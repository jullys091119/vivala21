"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/components/NationalCardv2/NationalCardv2.module.css";
import CardLg from "@/app/components/cardLg/CardLg";

const NacionalCardV2 = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [mainNews, setMainNews] = useState(null);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  const stripHtml = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const limitTitle = (title) => {
    if (!title) return "";
    return title.length > 60 ? title.substring(0, 60) + "..." : title;
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (!apiUrl) throw new Error("API URL no está definida.");

        const response = await fetch(
          `${apiUrl}wp/v2/posts?_embed&categories=11&per_page=4&offset=1`
        );
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setNews(data);
        setMainNews(data[0]);
        setArticles(data.slice(1, 4));
      } catch (err) {
        console.error("Error cargando noticias:", err);
        setError("Error cargando noticias.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div className={styles.loading}>Cargando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.nacionalCardContainer}>
      {mainNews && (
        <div className={styles.mainContent}>
          <CardLg
            currentShow={mainNews}
            category="Nacional"
            classCss="cat--nacional"
            placeholderImage="/images/custom-placeholder.jpg"
            altText=""
          />
        </div>
      )}

      <div className={styles.sideContent}>
        {articles.map((article) => (
          <Link key={article.id} href={`/noticias/${article.id}`} className={styles.sideCard}>
            <p className={styles.newsCategoryName}>NACIONAL</p>
            <p className={styles.title}>{limitTitle(stripHtml(article?.title?.rendered || ""))}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NacionalCardV2;
