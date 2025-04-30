import { useState, useEffect } from "react";
import SimpleCard from "@/app/components/SimpleCard/SimpleCard";
import CardLg from "@/app/components/cardLg/CardLg";
import styles from "@/app/components/PoliciacaCol/PoliciacaCol.module.css";

const PoliciacaCol = () => {
  const [loading, setLoading] = useState(true);
  const [policeNews, setPoliceNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState(null);

  const stripHtml = (html) => {
    return html?.replace(/<[^>]*>/g, "") || "";
  };

  const limitTitle = (title) => {
    const cleanTitle = stripHtml(title);
    return cleanTitle.length > 60 ? cleanTitle.slice(0, 150) + "..." : cleanTitle;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts?categories=11&_embed&per_page=3`, // ✅ Solo 3 noticias
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFeaturedNews(data[0]); // ✅ Noticia destacada
        setPoliceNews(data.slice(1, 3)); // ✅ Solo dos noticias en SimpleCard
      } catch (error) {
        console.error("Error fetching police news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.policiacaCardContainer}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <span>Cargando...</span>
          </div>
        ) : (
          <div className={styles.mainContent}>
            {featuredNews && (
              <CardLg
                currentShow={featuredNews}
                category="Policiaca"
                classCss="cat--policiaca"
                placeholderImage={featuredNews?.jetpack_featured_media_url || "/images/placeholder.jpg"}
                altText="Imagen destacada"
              />
            )}
          </div>
        )}
      </div>

      <div className={styles.simpleCardContainer}>
        {policeNews.map((item) => (
          <SimpleCard
            key={item.id}
            title={limitTitle(item.title.rendered)}
            category="policiaca"
            id={item.id}
            color="#D9534F"
          />
        ))}
      </div>
    </div>
  );
};

export default PoliciacaCol;
