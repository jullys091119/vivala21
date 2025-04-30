import styles from '@/app/components/MobileTop/MobileTop';

const MobileTop = () => {
  return (
    <div className={styles.mobileTopBar}>
      <div className={styles.socialIcons}>
        <a href="https://www.facebook.com/vivalanoticia" className={`${styles.icon} ${styles.facebook}`} target="_blank">
          {/* SVG de Facebook */}
        </a>
        <a href="https://www.instagram.com/vivalanoticiamx" className={`${styles.icon} ${styles.instagram}`} target="_blank">
          {/* SVG de Instagram */}
        </a>
        <a href="https://www.youtube.com/user/VivaLaNoticia" className={`${styles.icon} ${styles.youtube}`} target="_blank">
          {/* SVG de YouTube */}
        </a>
        <a href="https://x.com/vivalanoticia?lang=es" className={`${styles.icon} ${styles.twitter}`} target="_blank">
          {/* SVG de Twitter */}
        </a>
      </div>
      <div className={styles.actionIcons}>
        <div>
          {/* SVG de Separador */}
        </div>
      </div>
    </div>
  );
};

export default MobileTop;
