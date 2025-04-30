'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/app/components/Footer/Footer.module.css';
import logoPng from '@/app/assets/images/footer/logo.png';
import FacebookIcon from '@/app/components/Icons/FacebookIcon';
import InstagramIcon from '@/app/components/Icons/IstagramIcon';
import YoutubeIcon from '@/app/components/Icons/YoutubeIcon';
import TwitterIcon from '@/app/components/Icons/TwitterIcon';
import LocationIcon from '../Icons/LocationIcon';
import PhoneIcon from '../Icons/PhoneIcon';
import EmailIcon from '../Icons/MailIcon';

const FooterPage = () => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubscribe = async () => {
    if (!form.email || !form.name) {
      setMessage('Por favor completa todos los campos');
      setMessageType('error');
      return;
    }

    if (!form.email.includes('@')) {
      setMessage('Por favor ingresa un correo válido');
      setMessageType('error');
      return;
    }

    try {
      setIsLoading(true);
      setMessage('');

      const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/custom/v1/subscribe`, {
        method: 'POST',
        body: JSON.stringify({
          email: form.email,
          first_name: form.name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al suscribirse. Por favor intenta de nuevo.');
      }

      setForm({ name: '', email: '' });
      setMessage('¡Gracias por suscribirte!');
      setMessageType('success');
    } catch (error) {
      console.error('Error de suscripción:', error);
      setMessage(error.message || 'Error al suscribirse. Por favor intenta de nuevo.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogoContact}>
            <Image src={logoPng} alt="Viva La Noticia" className={styles.footerLogo} />
            <div className={styles.contactInfo}>
              <p style={{ display: 'flex', paddingLeft: 3 }}>
                <LocationIcon className={styles.iconLocation} />
                <span className={styles.iconLocation}>
                  De Los Insurgentes 334, Centro, 80000, Culiacán Rosales, Sin.
                </span>
              </p>
              <p style={{ display: 'flex', paddingLeft: 3 }}>
                <PhoneIcon className={styles.iconPhone} />
                <span className={styles.iconPhone}>667-459-1100</span>
              </p>
              <p style={{ display: 'flex' }}>
                <EmailIcon className={styles.iconEmail} />
                <span className={styles.iconEmail}>vivalanoticla@gmail.com</span>
              </p>
            </div>

          </div>

          <div className={styles.footerSections}>
            <h3>SECCIONES</h3>
            <div className={styles.customHr}>
              <svg width="280" height="1" viewBox="0 0 280 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="0.5" x2="280" y2="0.5" stroke="#C5C5C5" />
              </svg>
            </div>
            <nav className={styles.footerNav}>
              <Link href="/">Inicio</Link>
              <Link href="/sinaloa">Sinaloa</Link>
              <Link href="/seguridad">Seguridad</Link>
              <Link href="/nacional">Nacional</Link>
              <Link href="/deportes">Deportes</Link>
              <Link href="/entretenimiento">Entretenimiento</Link>
              <Link href="/internacional">Internacional</Link>
              <Link href="/virales">Virales</Link>
            </nav>
          </div>
        </div>

        <div className={styles.footerSocial}>
          <Link
            href="https://www.facebook.com/vivalanoticia"
            className={styles.socialIcon}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </Link>
          <Link
            href="https://www.instagram.com/vivalanoticia"
            className={styles.socialIcon}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </Link>
          <Link
            href="https://www.youtube.com/user/VivaLaNoticia"
            className={styles.socialIcon}
            target="_blank"
            rel="noopener noreferrer"
          >
            <YoutubeIcon />
          </Link>
          <Link
            href="https://x.com/vivalanoticia?lang=es"
            className={styles.socialIcon}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
