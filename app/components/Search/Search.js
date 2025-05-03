'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/noticias/[id]/pages.module.css'; // Asegúrate de tener este archivo

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const SearchComponent = () => {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('s') || '');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchQuery.trim().length === 0) return;

    setLoading(true);
    setError('');
    fetch(`https://api.vivalanoticia.mx/wp-json/wp/v2/posts?search=${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setSearchResults(data);
        } else {
          setSearchResults([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al buscar noticias:', err);
        setError('Ocurrió un error al buscar noticias.');
        setLoading(false);
      });
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim().length > 0) {
      // Trigger useEffect by setting the same value again (if needed)
      setSearchQuery(searchQuery);
    }
  };

  return (
    <div className={styles.debugContainer}>
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Buscar noticias..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Buscar</button>
      </form>

      <div className={styles.layoutContainer}>
        <div className={styles.mainContent}>
          {loading ? (
            <div className={styles.loading}>Cargando noticias...</div>
          ) : error ? (
            <div className={styles.errorMessage}>{error}</div>
          ) : searchResults.length > 0 ? (
            <div className={styles.newsContainer}>
              {searchResults.map((noticia) => (
                <div key={noticia.id} className={styles.newsCard}>
                  <Link href={`/noticias/${noticia.id}`}>
                    <h3 dangerouslySetInnerHTML={{ __html: noticia.title?.rendered || 'Sin título' }} />
                  </Link>
                  <span>{formatDate(noticia.date)}</span>
                  <p dangerouslySetInnerHTML={{ __html: noticia.excerpt?.rendered || 'Sin resumen disponible.' }} />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.errorMessage}>
              No se encontraron resultados para "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
