// components/NationalNews.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './NationalCardv2.module.css';

import IconsDate from '@/public/svg/icon-date.svg';
import AuthorIcon from '@/public/svg/icon-note.svg';
import Image from 'next/image';

export default function NationalNews({ apiUrl }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);
  const [mainNews, setMainNews] = useState(null);
  const [articles, setArticles] = useState([]);
  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  // UseEffect para cargar las noticias
  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`${baseUrl}wp/v2/posts?_embed&categories=11&per_page=4&offset=1`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setNews(data);
        setMainNews(data[0]);
        setArticles(data.slice(1, 4));
      } catch (err) {
        setError('Error loading news');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [baseUrl]); // Aseguramos que baseUrl sea la dependencia, ya que no depende de `apiUrl`

  // Función para eliminar las etiquetas HTML
  const stripHtml = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  // Función para limitar la longitud del título
  const limitTitle = (title) => {
    if (!title) return '';
    return title.length > 60 ? title.substring(0, 60) + '...' : title;
  };

  // Función para formatear la fecha
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options);
  };

  // Si está cargando, mostramos el texto de carga
  if (loading) return <div className={styles.loading}>Cargando...</div>;

  // Si hay error, mostramos el mensaje de error
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles['nacional-card-container']}>
      {mainNews && (
        <div className={styles['main-content']}>
          <Link href={`/noticias/${mainNews.id}`} className={styles['main-content-link']}>
            <div className={styles['main-content-hero']}>
              <div className={styles.imageContainer}>
                <Image
                  src={mainNews?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'}
                  alt="Imagen principal"
                  fill
                  className={styles.responsiveImage}
                />
              </div>
              <div className={styles['hero-content-text']}>
                <div className={styles['hero-news-category-name']}>NACIONAL</div>
                <p className={styles['hero-title']}>
                  {limitTitle(stripHtml(mainNews.title.rendered))}
                </p>
              </div>
            </div>
          </Link>
          <div className={styles['main-content-body']}>
            {stripHtml(mainNews.excerpt.rendered)}
          </div>
          <div className={styles['author-date']}>
            <div className={styles['author-info']}>
              <span className={styles['author']}>
                <Image src={AuthorIcon} alt="Author" width={16} height={16} />
                {mainNews?._embedded?.author?.[0]?.name || 'Autor desconocido'}
              </span>
            </div>
            <div className={styles['date-info']}>
              <span className={styles['date']}>
                <Image src={IconsDate} alt="Date" width={16} height={16} />
                {formatDate(mainNews.date)}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className={styles['side-content']}>
        {articles.map((article) => (
          <Link key={article.id} href={`/noticias/${article.id}`} className={styles['side-card']}>
            <div className={styles['hero-news-category-name']}>NACIONAL</div>
            <p className={styles['title']}>
              {limitTitle(stripHtml(article?.title?.rendered || ''))}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
