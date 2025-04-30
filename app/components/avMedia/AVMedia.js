"use client";
import React, { useRef, useEffect } from 'react';
import { useAVMedia } from '@/app/composables/useAVMedia';  // Ajusta la ruta si es necesario

const AVMedia = (props) => {
  const canvas = useRef(null);

  // Llamamos directamente a useAVMedia y pasamos la referencia de canvas
  useAVMedia({ media: props.media, fftSize: 256, lineColor: 'blue', canvWidth: 500, canvHeight: 300 });

  return <canvas ref={canvas} />;
};

export default AVMedia;
