/*
  Temos as props 'label' (rótulo do input);
  type (se email ou password, etc);
  name (que liga o label ao input);
  value (valor default do input);
  onChange (a função de callback a cada mudança
    no input)
  onBlur (mesmo funcionamento de onChange)
  error (que será acionado caso as infos não
    forem válidas)
  
  Esses 4 últimos são props vindos de 'useForm'
*/

import React from "react";
import styles from "./Input.module.css";

const Input = ({ label, type, name, value, onChange, error, onBlur }) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
