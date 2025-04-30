"use client"
import { useRef, useEffect } from 'react';

export function useAVMedia(props) {
  const canvasRef = useRef(null);
  let analyser;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const stream = props.media; // O lo que sea que estés pasando como prop

    if (stream) {
      analyser = setAnalyser(stream, props);
      // Aquí llamas a la función que controlará la animación (similar a useRafFn en Vue)
      const intervalId = requestAnimationFrame(() => {
        draw(analyser, ctx, props);
      });

      return () => cancelAnimationFrame(intervalId);
    }
  }, [props]);

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
    ctx.clearRect(0, 0, p.canvWidth, p.canvHeight);
    // Aquí puedes llamar a las funciones de dibujo
  };

  return canvasRef;
}
