'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from './NewsCarousel.module.css'; // crea tu archivo CSS para estilos personalizados
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const NewsCarousel = () => {
  const router = useRouter();
  const swiperRef = useRef(null);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts?_embed&per_page=5`
      );
      const data = await response.json();
      const selectedPosts = data.slice(1, 3);

      const posts = selectedPosts.map(post => ({
        id: post.id,
        image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
        title: post.title.rendered,
        author: post._embedded?.author?.[0]?.name || 'Autor desconocido',
        date: new Date(post.date).toLocaleDateString('es-ES', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }),
      }));

      setSlides(posts);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const limitTitle = (title) =>
    title?.length > 60 ? `${title.substring(0, 60)}...` : title;

  const navigateToPost = (id) => {
    router.push(`/noticias/${id}`);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <div className={styles.loading}>Cargando...</div>;

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className={styles.carouselItem} onClick={() => navigateToPost(slide.id)}>
            <img src={slide.image} alt={slide.title} />
            <div className={styles.carouselCaption}>
              <div className={styles.authorInfo}>
                {slide.author} — {slide.date}
              </div>
              <p>{limitTitle(slide.title)}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default NewsCarousel;
