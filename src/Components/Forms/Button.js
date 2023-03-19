/*
  'children' é a props que traz os valores que fica
    entre o próprio componente. Por exemplo, quando
    temos <Button>Entrar</Button>, 'children' traz o
    valor 'Entrar'

  '...props' possibilita trazer qualquer outra 
    propriedade sem necessariamente ter uma fixa.
    Pode ser 'disabled', 'onClick', 'onSubmmit', 
    isto é, o que precisar no momento.
*/

import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
