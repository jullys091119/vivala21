import styles from "@/app/components/NationalCard/NacionalCard.module.css";
import Image from "next/image";

const NacionalCard = ({ mainNews, articles, loading, error }) => {
  if (loading) return <div className={styles.loading}>Cargando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.nacionalCardContainer}>
      {/* ✅ Sección principal con CardLg */}
      {mainNews && (
        <div className={styles.mainContent}>
          {/* Aquí deberías importar y usar <CardLg /> con los datos de `mainNews` */}
        </div>
      )}

      {/* ✅ Lista de artículos en la barra lateral */}
      <div className={styles.sideContent}>
        {articles?.length > 0 ? (
          articles.map((article, index) => {
            // ✅ Verifica si la imagen está disponible antes de renderizar
            const imageUrl =
              article._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/placeholder.jpg";

            return (
              <a
                key={article.id}
                href={`/noticias/${article.id}`}
                className={`${styles.sideCard} ${index < articles.length - 1 ? styles.mb36 : ""}`}
              >
                <Image
                  src={imageUrl}
                  alt={article.title.rendered || "Imagen de la noticia"}
                  width={320}
                  height={137}
                  className={styles.sideCardImage}
                  priority
                />
                <div className={styles.sideCardContent}>
                  <p className={styles.newsCategoryName}>NACIONAL</p>
                  {article.title?.rendered ? (
                    <p className={styles.title} dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
                  ) : (
                    <p className={styles.title}>Título no disponible</p>
                  )}
                </div>
              </a>
            );
          })
        ) : (
          <p className={styles.noNews}>No hay noticias disponibles en este momento.</p>
        )}
      </div>
    </div>
  );
};

export default NacionalCard;
