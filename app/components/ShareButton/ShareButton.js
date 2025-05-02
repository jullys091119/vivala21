// components/ShareButton.js
'use client'; // 👈 Esto lo convierte en un Client Component

import React from 'react';
import styles from '@/index.module.css';

export default function ShareButton({ url, title }) {
  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Enlace copiado al portapapeles');
    });
  };
  <button onClick={copyLink} className={styles.shareIcon}>
    <Image src="/images/link.svg" alt="Copiar enlace" width={24} height={24} />
  </button>
}
