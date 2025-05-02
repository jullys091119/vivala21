// components/ShareButton.js
'use client';

import React from 'react';
import styles from '@/index.module.css';
import Image from 'next/image';

export default function ShareButton({ url }) {
  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert('Enlace copiado al portapapeles');
    });
  };

  return (
    <button onClick={copyLink} className={styles.shareIcon}>
      <Image src="/images/link.svg" alt="Copiar enlace" width={24} height={24} />
    </button>
  );
}
