'use client';
import { useState } from 'react';
import styles from '@/app/components/UpdateProfile/UpdateProfile.module.css';
import Image from 'next/image'; // Importa Image de Next.js
import user from '@/app/assets/images/accountUser/Group4.png';
import user2 from '@/app/assets/images/accountUser/Group5.png';

const UpdateProfile = () => {
  const [form, setForm] = useState({
    username: 'Mario234',
    firstName: 'Mario',
    lastName: 'Cota Hernandez',
    email: 'mario1234@hotmail.com',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de actualización del perfil
  };

  return (
    <div className={styles.updateProfileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.userIcon}>
          {/* Usando Image de Next.js para optimizar las imágenes */}
          <Image
            src={user}
            alt="icono de usuario"
            width={50} // Ajusta el tamaño de acuerdo a tus necesidades
            height={50} // Ajusta el tamaño de acuerdo a tus necesidades
          />
          <Image
            src={user2}
            alt="icono de usuario"
            width={50} // Ajusta el tamaño de acuerdo a tus necesidades
            height={50} // Ajusta el tamaño de acuerdo a tus necesidades
          />
        </div>
        <h2 className={styles.profileTitle}>Cuenta</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.accountForm}>
        <div className={styles.formGroup}>
          <label>Nombre de usuario</label>
          <input
            type="text"
            className={styles.inputData}
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Nombre</label>
          <input
            type="text"
            className={styles.inputData}
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Apellidos</label>
          <input
            type="text"
            className={styles.inputData}
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Correo electrónico</label>
          <input
            type="email"
            className={styles.inputData}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className={styles.formSubmit}>
          <button type="submit" className={styles.submitButton}>
            Actualizar cuenta
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
