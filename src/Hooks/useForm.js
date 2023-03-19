/*
  Traz dois comportamentos que serão reativos:
    -'value': que é o valor inserido no formulário
    -'error': acusa erro de acordo com o 'value' passado
  
  Recebe como parâmentro o tipo de input. Exemplo, se 
    for passado 'email', ele fará a checagem se o valor
    passado for um email, contanto que essa validação 
    esteja prevista na constante 'types'.

*/

import React from "react";

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um email válido",
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message:
      "A senha precisa ter 1 caracter maíusculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres.",
  },
};

const useForm = (type) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  function validate(value) {
    // se for passado falso não valida nada e função já retorna true
    if (type === false) return true;
    // não preencheu nenhum valor
    if (value.length === 0) {
      setError("Preencha um valor.");
      return false;
      // validação do tipo de input
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
      // se tudo passar, será setado o erro como null e a função como true
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    /* 
      a condicional abaixo evita que a msg 
        de erro apareça inicialmente, já que
        'error' tem null como default
    */
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value), // método que ativa outro método
    onBlur: () => validate(value),
  };
};

export default useForm;
