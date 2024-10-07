import React from 'react';
import styles from './styles/formField.module.css'

const FormField = ({ label, type, value, onChange }) => {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
};

export default FormField;
