/*
  Esse é o componente que renderiza a página de login.

  Possui 2 estados reativos que armazenam o username e 
    password através de um hook customizado 'useForm',
    que foi feito só para lidar com formulário.
  
  'userForm' dá a username e password o método 'validate', que
    realiza validações de formulário. Se ambos passarem é
    feito o login em 'userLogin' que está em 'UserContext'

  Nele, encontramos botão que levar para a página 'create'.

  Tanto os botões quanto os inputs são componentes customizados
  que estão na pasta 'Forms'.

  Os inputs recebem propriedades de 'useForm' como 'value', 
    'onChange', 'onBlur'.

*/

import React from "react";
import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Error from "../Helper/Error";
import styles from "./LoginForm.module.css";
import stylesBtn from "../Forms/Button.module.css";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button> // se tiver carregando o botão desabilita
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error} />
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a Senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
