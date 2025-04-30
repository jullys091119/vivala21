import Image from 'next/image'; // Importa el componente Image de Next.js
import styles from '@/app/components/PromoCard/PromoCard.module.css';

const PromoCard = ({ title, image, link }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={styles.promoCard}>
      <div className={styles.promoCardHeader}>
        <h2 className={styles.promoCardTitle}>{title}</h2>
      </div>
      <div className={styles.promoCardBody}>
        <Image
          src={image}
          alt={`Imagen promocional de ${title}`} // Mejor descripción para accesibilidad
          className={styles.promoCardImage}
          width={500} // Agrega un tamaño adecuado según el diseño
          height={300} // Agrega un tamaño adecuado según el diseño
        />
      </div>
    </a>
  );
};

export default PromoCard;
