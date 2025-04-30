import { useState, useEffect } from 'react';
import SimpleCard from '@/app/components/SimpleCard/SimpleCard';
import CardLg from '@/app/components/cardLg/CardLg';
import styles from '@/app/components/Internacional/InternacionalCol.module.css';

const InternacionalCol = () => {
  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState([]);
  const [currentShow, setCurrentShow] = useState(null);

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
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts?categories=8&_embed`,
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
        setShows(data);
        setCurrentShow(data[0]);
      } catch (error) {
        console.error("Error fetching international shows:", error);
        // You might want to set some error state here
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <div className={styles.espectaculosCardContainer}>
        {/* Loading state */}
        {loading ? (
          <div className={styles.loadingContainer}>
            <span>Cargando...</span>
          </div>
        ) : (
          /* Main content */
          <div className={styles.mainContent}>
            <CardLg
              currentShow={currentShow}
              category="Internacional"
              classCss="cat--international"
              placeholderImage={currentShow.jetpack_featured_media_url}
              altText="Imagen destacada"
            />
          </div>
        )}
      </div>

      <div className={styles.simpleCardDesktop}>
        {shows.slice(1, 3).map((item) => (
          <SimpleCard
            key={item.id}
            title={limitTitle(item.title.rendered)}
            category="espectaculo"
            id={item.id}
            color="#704DAB"
          />
        ))}
      </div>
      <div className={styles.simpleCardMobile}>
        {shows.slice(1, 3).map((item) => (
          <SimpleCard
            key={item.id}
            title={limitTitle(item.title.rendered)}
            category="espectaculo"
            id={item.id}
            color="#704DAB"
          />
        ))}
      </div>
    </div>
  );
};

export default InternacionalCol;