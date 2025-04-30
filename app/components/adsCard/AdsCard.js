"use client";
import Image from 'next/image';
import addsCardImg from '@/app/assets/images/VIVA-LA-NOTICIA-1163-X-1280-14-650x715 1.jpg';
import styles from './AdsCard.module.css'; // ✅ importaste el CSS module

export default function AdsCard() {
  return (
    <div className={styles['ads-card-container']}>
      <div className={styles['ads-card-header']}>
        <h2 className={styles['ads-title']}>Ayuntamiento Culiacán!</h2>
      </div>
      <div className={styles['ads-card-body']}>
        <Image
          src={addsCardImg}
          alt="Ayuntamiento Culiacán"
          width={267}
          height={294}
          className={styles['ads-image']}
        />
      </div>
    </div>
  );
}
