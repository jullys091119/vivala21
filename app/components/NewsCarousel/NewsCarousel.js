'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from './NewsCarousel.module.css'; // crea tu archivo CSS para estilos personalizados
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image'; // Importa el componente Image de Next.js
import IconAuthor from '@/public/svg/icon-note.svg';
import IconDate from '@/public/svg/icon-date.svg' // Asegúrate de que la ruta sea correcta
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
    <div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        // spaceBetween={30}
        // slidesPerView={1}
        // pagination={{ clickable: true }}
        // autoplay={{ delay: 5000 }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={styles.carouselItem} onClick={() => navigateToPost(slide.id)}>
              <Image
                src={slide.image}
                alt={`Imagen de la noticia: ${slide.title}`}
                width={600}
                height={400}
                className={styles.carouselImage}
              />
              <div className={styles.carouselCaption}>
                <div className={styles.containerContent}>
                  <div className={styles.authorInfo}>
                    <Image src={IconAuthor} alt="Icono de autor" className={styles.whiteIcon} />
                    <p>{slide.author}</p>
                  </div>
                  <div className={styles.authorInfo}>
                    <Image src={IconDate} alt="Icono de fecha" className={styles.whiteIcon} />
                    <p>{slide.date}</p>
                  </div>
                </div>
                <p className={styles.slideTitle}>{limitTitle(slide.title)}</p>
              </div>
            </div>
          </SwiperSlide>


        ))
        }
      </Swiper >

    </div>
  );
};

export default NewsCarousel;
