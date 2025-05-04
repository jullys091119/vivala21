import Image from 'next/image';
import styles from '@/app/components/RadioStationsMobile/RadioStationMobile.module.css';
import RJMazatlan from '@/app/assets/images/player/logos/RJ-Mazatlan.png';
import KeBuenaGusave from '@/app/assets/images/player/KE-BUENA-GUASAVE.png';
import LaMejorCuliacan from '@/app/assets/images/player/lamejor104fm.png';
import OscarFm from '@/app/assets/images/player/oscarFM.png';
import { useRadio } from '@/app/Context';
const stations = [
  {
    name: 'La RJ Mazatlán',
    src: RJMazatlan,
    url: 'https://radioweb.stream/sinaloa.mazatlan/xerj.aac/icecast.audio',
  },
  {
    name: 'Ke Buena Guasave',
    src: KeBuenaGusave,
    url: 'https://radioweb.stream/sinaloa.guasave/xhpgvs.aac/icecast.audio',
  },
  {
    name: 'La mejor Culiacán',
    src: LaMejorCuliacan,
    url: 'https://radioweb.stream/sinaloa.culiacan/xecq.aac/icecast.audio',
  },
  {
    name: 'Oscar FM',
    src: OscarFm,
    url: 'https://icy.gvstream.live/gpm-cruz.mp3',
  },
];

export default function RadioStationsMobile() {
  const { selectTrack, currentTrack, isPlaying } = useRadio();
  return (
    <div className={styles.radioStationsDropdownMobile}>
      {stations.map((station, index) => (
        <div className={styles.stationItems} key={index}>
          <button
            className={`play-button ${isPlaying && currentTrack?.url === station.url ? 'playing' : ''}`}
            onClick={() => selectTrack({
              src: station.url,
              title: station.name,
              artwork: station.src,
            })}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#006238" d="M8 5v14l11-7z"></path>
            </svg>
          </button>
          <Image
            src={station.src}
            alt={station.name}
            width={40}
            height={40}
            className="station-logo"
          />
          <div className="station-info">
            <span className="station-name">{station.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
