"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/components/HeaderMobile/HeaderMobile.module.css"; // Importar CSS Modules
import LogoViva from '@/app/assets/images/logo.png';
import RadioIcon from '@/app/components/Icons/RadioIcon';
import RadioStationsMobile from "@/app/components/RadioStationsMobile/RadioStationsMobile";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSinaloaOpen, setIsSinaloaOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSinaloa = () => {
    setIsSinaloaOpen(!isSinaloaOpen);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <>
      <header className={styles.containerHeaderMobile}>
        {/* RadioStationsMobile solo depende de isDropdownOpen */}
        {isDropdownOpen && <RadioStationsMobile />}
        <div className={styles.contentHeaderMobile}>
          <div className={styles.containerButtons}>
            <button onClick={toggleMenu} className={styles.menuButton}>
              {isMenuOpen ? "✕" : "☰"}
            </button>
            <Image src={LogoViva} alt="Logo" width={288} height={36} />

          </div>

          <div className={styles.radioDropdownMobile} onClick={toggleDropdown}>
            <button className={styles.radioDropdownMobile}>
              <RadioIcon />
              RADIO EN VIVO
            </button>
          </div>
          {isMenuOpen && (
            <div className={styles.mobileMenu}>
              <div className={styles.menuTop}>
                <button onClick={toggleMenu} className={styles.closeButton}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <path d="M6 18L18 6M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Navegación */}
              <nav className={styles.menuContent}>
                <Link href="/" onClick={toggleMenu}>INICIO</Link>

                {/* Menú Sinaloa */}
                <div className={styles.collapsibleMenu}>
                  <button onClick={toggleSinaloa} className={styles.menuHeader}>
                    <span>SINALOA</span>
                    <svg className={isSinaloaOpen ? styles.rotated : ""} width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  {isSinaloaOpen && (
                    <div className={styles.submenu}>
                      <Link href="/categorias/sinaloa-norte" onClick={toggleMenu}>Sinaloa Norte</Link>
                      <Link href="/categorias/sinaloa-centro" onClick={toggleMenu}>Sinaloa Centro</Link>
                      <Link href="/categorias/sinaloa-sur" onClick={toggleMenu}>Sinaloa Sur</Link>
                    </div>
                  )}
                </div>

                {/* Otras categorías */}
                <Link href="/categorias/policia" onClick={toggleMenu}>SEGURIDAD</Link>
                <Link href="/categorias/nacional" onClick={toggleMenu}>NACIONAL</Link>
                <Link href="/categorias/deportes" onClick={toggleMenu}>DEPORTES</Link>
                <Link href="/categorias/espectaculo" onClick={toggleMenu}>ENTRETENIMIENTO</Link>
                <Link href="/categorias/internacional" onClick={toggleMenu}>INTERNACIONAL</Link>
                <Link href="/categorias/virales" onClick={toggleMenu}>VIRALES</Link>
              </nav>
            </div>
          )}

        </div>
      </header>
    </>
  );
};

export default MobileMenu;
