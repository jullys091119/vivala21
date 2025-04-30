import Link from 'next/link';
import SinaloaCard from '@/app/components/SinaloaCard/SinaloaCard'; // Adjust the import path as needed
import styles from '@/app/components/MainCard/MainCard.module.css';

const SinaloaContainer = () => {
  return (
    <div className={`${styles.mainCardContainer} mt-7`}>
      <div className={styles.mainCardHeader}>
        <h2>SINALOA</h2>
        <Link href="/categorias/sinaloa" className={styles.verMas}>
          <p>VER MÁS</p>
        </Link>
      </div>
      <SinaloaCard />
    </div>
  );
};

export default SinaloaContainer;