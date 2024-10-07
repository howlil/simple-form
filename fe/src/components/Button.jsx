import React from "react";
import styles from "./styles/button.module.css";

const Button = ({ label, onClick, disabled }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
