"use client"
import { useState } from 'react';
import styles from '@/app/components/SubscribeCard/SubscribeCard.module.css';

const SubscribeCard = () => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubscribe = async () => {
    if (!form.name || !form.email) {
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

      // Simulación de petición
      setTimeout(() => {
        setForm({ name: '', email: '' });
        setMessage('¡Gracias por suscribirte!');
        setMessageType('success');
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setMessage('Error al suscribirse. Por favor intenta de nuevo.');
      setMessageType('error');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.subscribeCard}>
      <div className={styles.subscribeCardHeader}>
        <h2>Boletín informativo</h2>
      </div>
      <div className={styles.susbcribedContainer}>
        <div className={styles.subscribeText}>
          Suscríbete a nuestro boletín informativo y recibe por correo las últimas noticias.
        </div>
        <input
          type="text"
          placeholder="Nombre *"
          className={styles.subscribeInput}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo electrónico *"
          className={styles.subscribeInput}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button
          className={styles.subscribeButton}
          onClick={handleSubscribe}
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : '¡Suscríbete!'}
        </button>
        {message && <div className={`${styles.message} ${styles[messageType]}`}>{message}</div>}
      </div>
    </div>
  );
};

export default SubscribeCard;
