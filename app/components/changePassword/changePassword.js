'use client';
import React, { useState } from 'react';
import styles from '@/app/components/changePassword/changePassword.module.css';

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Form submitted:', form);
  };

  return (
    <div className={styles.changePasswordContainer}>
      <div className={styles.containerTitle}>
        <h2 className={styles.title}>Cambiar la contraseña</h2>
      </div>
      <form onSubmit={handleSubmit} className={styles.passwordForm}>
        <div className={styles.formGroup}>
          <label>Contraseña actual</label>
          <div className={styles.passwordInput}>
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              className={styles.formInput}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Nueva contraseña</label>
          <div className={styles.passwordInput}>
            <input
              type={showNewPassword ? 'text' : 'password'}
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className={styles.formInput}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Confirmar la contraseña</label>
          <div className={styles.passwordInput}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className={styles.formInput}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Actualizar la contraseña
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
