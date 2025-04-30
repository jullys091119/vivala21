import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';  // Importamos el componente Image
import styles from '@/app/components/ViralesCarusel/ViralesCarousel.module.css';

const ViralesCarousel = () => {
  const [slides, setSlides] = useState([]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts?categories=25&_embed&per_page=10`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSlides(data);
      } catch (error) {
        console.error('Error fetching viral posts:', error);
        setSlides([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.viralesCarouselContainer}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        loop
      >
        {[...Array(Math.ceil(slides.length / 2))].map((_, index) => (
          <SwiperSlide key={index}>
            <div className={styles.carouselItemPair}>
              {slides[index * 2] && (
                <Link
                  href={`/noticias/${slides[index * 2].id}`}
                  className={styles.carouselItemLink}
                >
                  <div className={styles.carouselItem}>
                    <Image
                      src={slides[index * 2]._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''}
                      alt={slides[index * 2].title?.rendered}
                      width={600}   // Establece el ancho de la imagen
                      height={400}  // Establece el alto de la imagen
                      className={styles.carouselImage}
                      loading="lazy" // Activar carga perezosa
                    />
                    <div className={styles.carouselCaptionFirst}>
                      <p>{slides[index * 2].title?.rendered}</p>
                    </div>
                    <div className={styles.authorInfoFirst}>
                      {/* Author info content same as below */}
                    </div>
                  </div>
                </Link>
              )}

              {slides[index * 2 + 1] && (
                <Link
                  href={`/noticias/${slides[index * 2 + 1].id}`}
                  className={styles.carouselItemLink}
                >
                  <div className={styles.carouselItem}>
                    <Image
                      src={slides[index * 2 + 1]._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''}
                      alt={slides[index * 2 + 1].title?.rendered}
                      width={600}   // Establece el ancho de la imagen
                      height={400}  // Establece el alto de la imagen
                      className={styles.carouselImage}
                      loading="lazy" // Activar carga perezosa
                    />
                    <div className={styles.carouselCaptionSecond}>
                      <p>{slides[index * 2 + 1].title?.rendered}</p>
                    </div>
                    <div className={styles.authorInfoSecond}>
                      {/* Author info content same as first */}
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ViralesCarousel;


