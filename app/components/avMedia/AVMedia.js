"use client"
import React, { useRef, useEffect } from 'react';
import { useAVMedia } from '@/app/composables/useAVMedia';  // Ajusta la ruta si es necesario

const AVMedia = (props) => {
  const canvas = useRef(null);

  useEffect(() => {
    if (canvas.current) {
      // Llamamos directamente a useAVMedia pasando el canvas y las propiedades
      useAVMedia(canvas, props);  // Usamos las propiedades directamente
    }
  }, [props]);

  return <canvas ref={canvas} />;
};

export default AVMedia;
