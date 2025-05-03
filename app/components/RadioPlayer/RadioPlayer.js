'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/app/components/RadioPlayer/RadioPlayer.module.css';
import { useRadio } from '@/app/Context'; // Asegúrate de usar el contexto
import flechas from '@/app/assets/images/player/barajar-flechas.svg';
import volumen from '@/app/assets/images/player/sube-el-volumen.svg';
import laRJmazatlan from '@/app/assets/images/player/logos/RJ-Mazatlan.png';
import keBuenaGuasave from '@/app/assets/images/player/KE-BUENA-GUASAVE.png';
import laMejor from '@/app/assets/images/player/lamejor104fm.png';
import oscarFM from '@/app/assets/images/player/oscarFM.png';

const tracks = [
  {
    src: 'https://radioweb.stream/sinaloa.mazatlan/xerj.aac/icecast.audio',
    title: 'La RJ Mazatlán',
    artwork: laRJmazatlan,
  },
  {
    src: 'https://radioweb.stream/sinaloa.guasave/xhpgvs.aac/icecast.audio',
    title: 'Ke Buena Guasave',
    artwork: keBuenaGuasave,
  },
  {
    src: 'https://radioweb.stream/sinaloa.culiacan/xecq.aac/icecast.audio',
    title: 'La mejor Culiacán',
    artwork: laMejor,
  },
  {
    src: 'https://icy.gvstream.live/gpm-cruz.mp3',
    title: 'Oscar FM',
    artwork: oscarFM,
  },
];

export default function RadioPlayer() {
  const { selectTrack } = useRadio();  // Asegúrate de usar el contexto
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const playerRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasCtx = useRef(null);
  const animationId = useRef(null);
  const timer = useRef(null);

  const togglePlay = async () => {
    try {
      if (!isPlaying) {
        await playerRef.current.play();
        setIsPlaying(true);
        startTimer();
        drawFakeWaveform();
      } else {
        playerRef.current.pause();
        setIsPlaying(false);
        stopTimer();
        cancelAnimationFrame(animationId.current);
      }
    } catch (err) {
      console.error('Playback error:', err);
    }
  };

  const handleTrackChange = (index) => {
    setIsLoading(true);
    const newTrack = tracks[index];
    setCurrentTrack(newTrack);
    setIsPlaying(false);
    setCurrentTime(0);
    playerRef.current.pause();
    playerRef.current.load();
    selectTrack(newTrack);  // Llamamos a selectTrack desde el contexto
    setTimeout(() => setIsLoading(false), 500);
  };

  const startTimer = () => {
    timer.current = setInterval(() => {
      setCurrentTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => clearInterval(timer.current);

  const drawFakeWaveform = () => {
    if (!canvasCtx.current) {
      canvasCtx.current = canvasRef.current.getContext('2d');
    }

    const draw = () => {
      animationId.current = requestAnimationFrame(draw);
      const ctx = canvasCtx.current;
      const canvas = canvasRef.current;
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.fillStyle = '#E2E2E2';
      ctx.fillRect(0, 0, width, height);

      const barWidth = 2;
      const barGap = 2;
      const barCount = Math.floor(width / (barWidth + barGap));
      ctx.fillStyle = '#1F621F';
      ctx.fillRect(0, centerY, width, 1);

      for (let i = 0; i < barCount; i++) {
        const barHeight = Math.random() * (height / 2 - 2);
        const x = i * (barWidth + barGap);
        ctx.fillRect(x, centerY - barHeight, barWidth, barHeight);
        ctx.fillRect(x, centerY + 1, barWidth, barHeight);
      }
    };

    draw();
  };

  const formattedTime = `${String(Math.floor(currentTime / 60)).padStart(2, '0')}:${String(currentTime % 60).padStart(2, '0')}`;

  return (
    <div className={styles.radioPlayer}>
      <h2 className={styles.radioTitle}>RADIO EN VIVO</h2>
      <hr className={styles.divider} />

      {/* Player */}
      <div className={styles.playerContainer}>
        <div className={styles.stationInfo}>
          <div className={styles.stationLogoContainer}>
            <Image src={currentTrack.artwork} alt="Station Logo" className={styles.stationLogo} />
          </div>

          <div className={styles.stationNameContainer}>
            <h3 className={styles.stationName}>{currentTrack.title}</h3>

            <div className={styles.playerControls}>
              <button onClick={togglePlay} className={styles.playButton}>
                {isPlaying ? (
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                    <circle cx="22" cy="22" r="21" fill="white" stroke="#1F621F" strokeWidth="2" />
                    <rect x="16" y="14" width="4" height="16" fill="#1F621F" />
                    <rect x="24" y="14" width="4" height="16" fill="#1F621F" />
                  </svg>
                ) : (
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                    <circle cx="22" cy="22" r="21" fill="white" stroke="#1F621F" strokeWidth="2" />
                    <path d="M17 14v16l13-8z" fill="#1F621F" />
                  </svg>
                )}
              </button>

              <span className={styles.playerTime}>{formattedTime}</span>

              <div className={styles.waveform}>
                <canvas ref={canvasRef} width="300" height="50" />
              </div>

              <div className={styles.additionalButtons}>
                <button className={styles.randomButton}>
                  <Image src={flechas} alt="shuffle" />
                </button>
                <button className={styles.muteButton}>
                  <Image src={volumen} alt="mute" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <audio ref={playerRef} src={currentTrack.src} preload="none" />

      {/* Station List */}
      <div className={styles.containerRadioStation}>
        {[0, 2].map((startIndex) => (
          <div className={styles.column} key={startIndex}>
            {tracks.slice(startIndex, startIndex + 2).map((track, index) => (
              <li
                key={startIndex + index}
                onClick={() => handleTrackChange(startIndex + index)}  // Aquí usamos handleTrackChange
                className={styles.trackItem}
              >
                <Image
                  src={track.artwork}
                  width={50}
                  height={50}
                  alt={track.title}
                  className={styles.trackLogo}
                />
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                  <path d="M0.276459 0V12L9.72353 6.00001L0.276459 0Z" fill="#1F621F" />
                </svg>
                <span className={styles.trackTitle}>{track.title}</span>
              </li>

            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
