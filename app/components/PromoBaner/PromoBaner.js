import { useState, useEffect } from "react";
import Image from "next/image";  // Importa Image de Next.js
import styles from "@/app/components/PromoBaner/PromoBaner.module.css";

const PromoBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
        if (!apiUrl) throw new Error("API URL no está definida.");

        // ✅ Usando el endpoint correcto
        const response = await fetch(`${apiUrl}wp/v2/banners?per_page=8&_fields=id,title,acf,status&acf_format=standard`);
        if (!response.ok) throw new Error(`Error HTTP! Status: ${response.status}`);

        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error("Error obteniendo banners:", error);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
    const interval = setInterval(fetchBanners, 5 * 60 * 1000); // ✅ Recarga cada 5 minutos

    return () => clearInterval(interval);
  }, []);

  const sortedBanners = banners.sort((a, b) => (Number(a.acf?.orden || 0) - Number(b.acf?.orden || 0)));

  const getImageUrl = (imageField) => {
    if (imageField?.url) return imageField.url;
    if (imageField) return `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/media/${imageField}`;
    return "/images/placeholder.jpg"; // ✅ Imagen de respaldo si no hay datos
  };

  return (
    <div className={styles.promoBanners}>
      {loading ? (
        <p>Cargando banners...</p>
      ) : banners.length > 0 ? (
        <ul className={styles.bannerList}>
          {sortedBanners.map((banner) => (
            <li key={banner.id}>
              {banner.acf?.banner_link && (
                <>
                  {/* Reemplazar <img> con <Image /> de Next.js */}
                  <a href={banner.acf.banner_link} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={getImageUrl(banner.acf.imagen_movil)}
                      alt={banner.title.rendered}
                      className={styles.bannerMobile}
                      width={600}  // Ajusta el tamaño según sea necesario
                      height={300}  // Ajusta el tamaño según sea necesario
                      loading="lazy"
                    />
                  </a>
                  <a href={banner.acf.banner_link} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={getImageUrl(banner.acf.imagen_tablet)}
                      alt={banner.title.rendered}
                      className={styles.bannerTablet}
                      width={600}  // Ajusta el tamaño según sea necesario
                      height={300}  // Ajusta el tamaño según sea necesario
                      loading="lazy"
                    />
                  </a>
                  <a href={banner.acf.banner_link} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={getImageUrl(banner.acf.banner)}
                      alt={banner.title.rendered}
                      className={styles.bannerDesktop}
                      width={1200}  // Ajusta el tamaño según sea necesario
                      height={630}  // Ajusta el tamaño según sea necesario
                      loading="lazy"
                    />
                  </a>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay banners disponibles en este momento.</p>
      )}
    </div>
  );
};

export default PromoBanners;
