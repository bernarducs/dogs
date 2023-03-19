/*
  Aqui encontramos todas rotas de login (para criar, 
    entrar, resetar).
  
  O componente default entre todas as rotas é LoginForm
    por causa do path="/"
  
  Repare no 'if' que redireciona o usuário a página 
    'conta' se ele estiver logado. Ele 'sabe' se está 
    logado através do UserContext.
  
*/

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPasswordReset from "./LoginPasswordReset";
import { UserContext } from "../../UserContext";
import styles from "./Login.module.css";

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login === true) return <Navigate to="/conta" />;
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="criar" element={<LoginCreate />} />
          <Route path="perdeu" element={<LoginPasswordLost />} />
          <Route path="resetar" element={<LoginPasswordReset />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
