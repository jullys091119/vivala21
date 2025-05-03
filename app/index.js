"use client"
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from '../index.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Componentes (deberás crearlos)
import MainCard from '@/app/components/MainCard/MainCard';
import NacionalCardV2 from '@/app/components/NationalCardv2/NationalCardv2';
import DeportesCarousel from '@/app/components/SportCarousel/SportCarousel';
import TabNews from '@/app/components/TabNews/TabNews';
import LiveNews from '@/app/components/LiveNews/LiveNews';
import SubscribeCard from '@/app/components/SubscribeCard/SubscribeCard';
import PromoCards from '@/app/components/PromoCards/PromoCards';
import RadioPlayer from './components/RadioPlayer/RadioPlayer';
import PromoBanners from './components/PromoBaner/PromoBaner';
import PoliciacaCol from '@/app/components/PoliciacaCol/PoliciacaCol';
import InternacionalCol from '@/app/components/Internacional/InternacionalCol';
import FooterPage from '@/app/components/Footer/Footer';
import Header from '@/app/components/Header/Header';
import NewsCarousel from '@/app/components/NewsCarousel/NewsCarousel';



const HomePage = () => {
  const router = useRouter();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const swiperRef = useRef(null);

  // Datos temporales - reemplazar con tu fuente real
  const website = {
    tracks: [
      { src: '/radio1.mp3', title: 'Radio 1', artwork: '/radio1.jpg' },
      { src: '/radio2.mp3', title: 'Radio 2', artwork: '/radio2.jpg' }
    ],
    currentTrack: null,
    isRadioPlaying: false
  };

  const navigateToPost = (id) => {
    router.push(`/noticias/${id}`);
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp/v2/posts?_embed&per_page=5`
      );
      const data = await response.json();

      const selectedPosts = data.slice(1, 3);

      // Mapeo simplificado - ajustar según tu API
      const postsWithAuthors = selectedPosts.map(post => ({
        id: post.id,
        image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
        title: post.title.rendered,
        author: post._embedded?.author?.[0]?.name || 'Autor desconocido',
        date: new Date(post.date).toLocaleDateString('es-ES', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      }));

      setSlides(postsWithAuthors);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const limitTitle = (title) => title?.length > 60 ? `${title.substring(0, 60)}...` : title;
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.row}>
          <div className={styles.mainContent}>
            <div className={styles.col1}>
              <NewsCarousel />
              <MainCard />
              <div className={styles.containerNews}>
                <h2>Nacional</h2>
                <Link href="/categorias/nacional" className={styles.moreNewLinks}>
                  <p>VER MÁS</p>
                </Link>
              </div>
              <NacionalCardV2 />

              <div className={styles.containerNews}>
                <h2>DEPORTES</h2>
                <Link href="/categorias/deportes" className={styles.moreNewLinks}>
                  <p>VER MÁS</p>
                </Link>
              </div>
              <DeportesCarousel />

              <div className={styles.twoColumnContainer}>
                <div className={styles.column}>
                  <div className={styles.headerColumns}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                      <h2 className={styles.headerColumnsTitle}
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: '#006238',
                          fontFamily: 'Montserrat, sans-serif'
                        }}

                      >POLICIACA</h2>
                      <Link href="/categorias/" className={styles.moreNewLinks}>
                        <p>VER MÁS</p>
                      </Link>

                    </div>
                  </div>
                  <PoliciacaCol />
                </div>

                <div className={styles.column}>
                  <div className={styles.headerColumns}>
                    <div className="conta" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                      <h2
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: '#006238',
                          fontFamily: 'Montserrat, sans-serif'
                        }}

                      >INTERNACIONAL</h2>
                      <Link href="/categorias/deportes" className={styles.moreNewLinks}>
                        <p>VER MÁS</p>
                      </Link>

                    </div>
                  </div>
                  <InternacionalCol />
                </div>

              </div>
            </div>

          </div>
          <div className={styles.row}>
            <div className={[styles.sidebar, styles.col2].join(' ')}>

              <div className={styles.stickyWrapper}>
                <TabNews />
                <LiveNews />
                <SubscribeCard />
                <PromoCards />
              </div>
            </div>
          </div>

        </div>
        <RadioPlayer />
      </div>
      <PromoBanners />
      <FooterPage />
    </div >
  );
};

export default HomePage;