// components/ShareButton.js
'use client'; // 👈 Esto lo convierte en un Client Component

import React from 'react';

export default function ShareButton({ url, title }) {
  const handleShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <button onClick={handleShare} style={{ background: '#1877f2', color: '#fff', padding: '10px', borderRadius: '6px' }}>
      Compartir en Facebook
    </button>
  );
}
