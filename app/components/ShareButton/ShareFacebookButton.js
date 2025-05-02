import Image from 'next/image';
import Link from 'next/link';

export default function ShareFacebookButton({ url, title }) {
  const shareUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`;
  const shareTitle = encodeURIComponent(title || 'Sin título');

  return (
    <Link href={shareUrl} target="_blank" rel="noopener noreferrer">
      <button style={buttonStyle}>
        <Image
          src="/images/facebook.svg"
          alt="Compartir en Facebook"
          width={24}
          height={24}
        />
        <span style={textStyle}>Compartir en Facebook</span>
      </button>
    </Link>
  );
}

// Estilos para el botón
const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  backgroundColor: '#1877f2',
  color: '#fff',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  gap: '10px',
  textAlign: 'center',
};

const textStyle = {
  fontSize: '14px',
};
