import styles from '@/app/components/PromoCard/PromoCard.module.css';

const PromoCard = ({ title, image, link }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={styles.promoCard}>
      <div className={styles.promoCardHeader}>
        <h2 className={styles.promoCardTitle}>{title}</h2>
      </div>
      <div className={styles.promoCardBody}>
        <img src={image} alt="Promo Card Image" className={styles.promoCardImage} />
      </div>
    </a>
  );
};

export default PromoCard;
