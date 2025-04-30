'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import CardMd from '@/app/components/cardMd/cardMd';
import styles from '@/app/components/SportCarousel/SportCarrousel.module.css';

const DeportesCarousel = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts?categories=12&_embed&per_page=4`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setSlides(data);
      } catch (err) {
        console.error('Error cargando posts de deportes:', err);
        setSlides([]);
      }
    };

    fetchData();
  }, []);

  // Agrupar de 2 en 2
  const groupedSlides = [];
  for (let i = 0; i < slides.length; i += 2) {
    groupedSlides.push([slides[i], slides[i + 1]]);
  }

  return (
    <div className={styles.carouselContainer}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        loop
        className={styles.carousel}
      >
        {groupedSlides.map((pair, index) => (
          <SwiperSlide key={index}>
            <div className={styles.carouselItemPair}>
              {pair.map(
                (post, i) =>
                  post && (
                    <CardMd
                      key={post.id}
                      post={post}
                    />
                  )
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DeportesCarousel;
