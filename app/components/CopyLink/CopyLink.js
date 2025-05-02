// app/components/CopyLinkButton.js
"use client"; // Esto indica que es un Client Component

import React from 'react';

const CopyLinkButton = ({ shareUrl }) => {
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Enlace copiado al portapapeles');
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <button onClick={copyLink} className="copyLinkButton">
      Copiar enlace
    </button>
  );
};

export default CopyLinkButton;
