'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/app/components/Header/Header.module.css';
import MobileTop from '@/app/components/MobileTop/MobileTop';
import SearchIcon from '@/app/components/Icons/SearchIcon';
import MenuIcon from '@/app/components/Icons/MenuIcon';
import CloseIcon from '@/app/components/Icons/CloseIcon';
import FacebookIcon from '@/app/components/Icons/FacebookIcon';
import InstagramIcon from '@/app/components/Icons/IstagramIcon';
import YoutubeIcon from '@/app/components/Icons/YoutubeIcon';
import TwitterIcon from '@/app/components/Icons/TwitterIcon';
import LogoViva from '@/app/assets/images/logo.png';
import RadioIcon from '@/app/components/Icons/RadioIcon';
import HomeIcon from '@/app/components/Icons/HomeIcon';
import RadioStationsDropdown from '@/app/components/RadioStations/RadioStations';

const Header = ({ website, userStore }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInput = useRef(null);

  const openSearch = () => {
    setIsSearchOpen(true);
    setTimeout(() => searchInput.current?.focus(), 100);
  };

  const closeSearch = () => setIsSearchOpen(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // evita comportamiento por defecto
      const query = searchQuery.trim();
      if (query) {
        closeSearch();
        setSearchQuery('');
        window.location.href = `/noticias/search?s=${encodeURIComponent(query)}`;
      }
    }
  };


  return (
    <header className={styles.header}>
      <div className={styles.container} >

        {/* Buscador */}
        {isSearchOpen && (
          <div className={styles.searchOverlay}>
            <div className={styles.searchContainer}>
              <button className={styles.closeButton} onClick={closeSearch}>×</button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={handleSearch}
                placeholder="Escribe algo"
                ref={searchInput}
              />
            </div>
          </div>
        )}
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.socialIcons}>
            <FacebookIcon color='rgb(31, 98, 31' height={26} width={20} />
            <InstagramIcon color='rgb(31, 98, 31' height={19} width={13} />
            <YoutubeIcon color='rgb(31, 98, 31' height={22} width={18} />
            <TwitterIcon color='rgb(31, 98, 31' height={15} width={20} />
          </div>

          <div className={styles.searchLogin}>
            <button className={styles.searchButton} onClick={openSearch}>
              <SearchIcon /> Buscar
            </button>
            {userStore?.isAuthenticated && (
              <button className={styles.subscribeButton} onClick={userStore.logout}>
                Salir
              </button>
            )}
          </div>
        </div>

        {/* Header principal */}
        <div className={styles.mainHeader}>
          <button className={styles.burgerMenu} onClick={toggleMobileMenu}>
            <MenuIcon />
          </button>

          <Link href="/">
            <Image src={LogoViva} alt="Viva La Noticia" className={styles.logo} />
          </Link>
          <nav className={styles.mainNav}>
            <Link href="/" className={styles.navItem}>
              <span>
                <HomeIcon />
              </span>
              INICIO
            </Link>

            <div className={styles.dropdown}>
              <span className={styles.dropdownTrigger}>
                <div className="textSinaloa">
                  SINALOA
                </div>
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 1.00928H12L6 6.17625L0 1.00928Z" fill="#1F621F" />
                </svg>
              </span>
              <ul className={styles.dropdownMenu}>
                <li><Link href="/categorias/sinaloa-norte" className={styles.navItem}>Sinaloa Norte</Link></li>
                <li><Link href="/categorias/sinaloa-centro" className={styles.navItem}>Sinaloa Centro</Link></li>
                <li><Link href="/categorias/sinaloa-sur" className={styles.navItem}>Sinaloa Sur</Link></li>
              </ul>
            </div>

            <Link href="/categorias/policiaca" className={styles.navItem}>SEGURIDAD</Link>
            <Link href="/categorias/nacional" className={styles.navItem}>NACIONAL</Link>
            <Link href="/categorias/deportes" className={styles.navItem}>DEPORTES</Link>
            <Link href="/categorias/espectaculo" className={styles.navItem}>ENTRETENIMIENTO</Link>
            <Link href="/categorias/internacional" className={styles.navItem}>INTERNACIONAL</Link>
            <Link href="/categorias/virales" className={styles.navItem}>VIRALES</Link>

            <div className={styles.radioDropdown} onClick={toggleDropdown}>
              <button className={styles.button}>
                <RadioIcon />
                RADIO EN VIVO
              </button>
              {isDropdownOpen && <RadioStationsDropdown />}
            </div>
          </nav>
        </div>

        {/* Menú móvil */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <MobileTop />
            <div className={styles.mobileMenuContent}>
              <button className={styles.mobileMenuClose} onClick={closeMobileMenu}>
                <CloseIcon />
              </button>
              <nav>

              </nav>
            </div>
          </div>
        )}
      </div>
    </header >
  );
};

export default Header;
