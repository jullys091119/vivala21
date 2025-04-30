'use client';
import React, { useState } from 'react';
import Image from 'next/image';  // Importar Image de Next.js
import styles from '@/app/components/DeleteAcount/DeleteAcount.module.css';

const DeleteAccount = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    // console.log('Delete account with password:', password);
  };

  return (
    <div className={styles.deleteAccountContainer}>
      <div className={styles.deleteHeader}>
        {/* Reemplazar <img> por <Image /> */}
        <Image
          src="/assets/images/accountUser/delete-icon.png"
          alt="Logo"
          className={styles.deleteIcon}
          width={40}  // Ajustar el tamaño
          height={40} // Ajustar el tamaño
        />
        <h2 className={styles.deleteTitle}>Borrar la cuenta</h2>
      </div>

      <p className={styles.deleteWarning}>
        ¿Seguro que quieres borrar tu cuenta? Esto borrará todos los datos de tu cuenta en el sitio.
        Para borrar tu cuenta, introduce a continuación la contraseña.
      </p>

      <form onSubmit={handleDelete} className={styles.deleteForm}>
        <div className={styles.formGroup}>
          <label>Contraseña</label>
          <div className={styles.passwordInput}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInput}
              placeholder="Introduce tu contraseña"
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button type="submit" className={styles.deleteButton}>
          Borrar la cuenta
        </button>
      </form>
    </div>
  );
};

export default DeleteAccount;
