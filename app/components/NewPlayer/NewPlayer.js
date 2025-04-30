import { useState, useEffect } from 'react';
import styles from '../styles/AVMedia.module.css';
import AVMedia from './AVMedia';

const AudioPlayer = () => {
  const [audioSrc, setAudioSrc] = useState('./file_example_MP3_1MG.mp3');
  const [showMedia, setShowMedia] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!showMedia && enabled) {
      setShowMedia(true);
    }
  }, [enabled, showMedia]); // Incluir 'showMedia' en el array de dependencias

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          {showMedia && (
            <div className={styles.row}>
              <div className={styles.col}>
                <AVMedia media={audioSrc} type="wform" lineColor="blue" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
