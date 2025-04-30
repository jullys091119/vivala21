"use client";
import { useRef, useEffect } from 'react';

export function useAVMedia(props) {
  const canvasRef = useRef(null);
  const analyserRef = useRef(null); // Usar useRef para almacenar `analyser`

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const stream = props.media;

    if (stream) {
      analyserRef.current = setAnalyser(stream, props); // Asignar el analyser a la ref
      const animate = () => {
        draw(analyserRef.current, ctx, props);  // Llamar a la función de dibujo
        requestAnimationFrame(animate);  // Continuar la animación
      };
      animate();  // Iniciar la animación

      return () => {
        cancelAnimationFrame(animate);  // Limpiar la animación al desmontar
      };
    }
  }, [props]);  // Dependencias: cuando las props cambien, re-ejecuta el useEffect

  const setAnalyser = (stream, p) => {
    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    const src = ctx.createMediaStreamSource(stream);

    src.connect(analyser);
    analyser.fftSize = p.fftSize;

    if (p.connectDestination) {
      analyser.connect(ctx.destination);
    }

    return analyser;
  };

  const draw = (analyser, ctx, p) => {
    const data = new Uint8Array(analyser.fftSize);
    analyser.getByteFrequencyData(data);  // Obtener datos de frecuencia
    ctx.clearRect(0, 0, p.canvWidth, p.canvHeight);
    // Aquí puedes dibujar en el canvas usando `data`
    // Ejemplo de cómo dibujar las frecuencias en el canvas (puedes personalizarlo)
    for (let i = 0; i < data.length; i++) {
      const barHeight = data[i];
      ctx.fillStyle = p.lineColor || 'blue';
      ctx.fillRect(i * 3, p.canvHeight - barHeight, 2, barHeight);
    }
  };

  return canvasRef; // Devuelve la referencia del canvas
}

