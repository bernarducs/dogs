/*
  Um contexto é criado no app para que os estados abaixo
    - data, login, loading, error - estejam disponíveis em
    qualquer lugar, num contexto global.
  
  Dessa forma poderei passar dados de login pro Header, por
    exemplo.
  
*/

import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./Api";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

// UserStorage envolverá todo app e será jogado no App.js !!!
export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null); // json com dados do usuário
  const [login, setLogin] = React.useState(null); // começa como null mas está entre true e false
  const [loading, setLoading] = React.useState(false); // ou é true ou false
  const [error, setError] = React.useState(null); // ou null, ou mensagem de erro

  const navigate = useNavigate();

  /*
    Ao fazer logout é removido o token do localStorage,
      apaga-se os dados, e claro, login como false

    Depois é redirecionado para a página de login

    Este callback estará no 'onClick' do componente 
      'Header'

    É usado o 'React.useCallback' para evitar que o 
      useEffect mais abaixo seja mude a cada renderização
  */
  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem("token");
      navigate("/login");
    },
    [navigate]
  );

  async function getUser(token) {
    /* 
      Pega a url e as options de acordo com o token passado
      Com esses valores, faz o fetch que retornará os dados
        do usuário que alimentará os estados 'data' e 'login' 
        como true
    */
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      // O processo de login acontece aqui. Erro entra como null
      //   e true para o 'loading'
      setError(null);
      setLoading(true);
      // Uma url e options são geradas com o user e senha passados
      const { url, options } = TOKEN_POST({ username, password });

      // Recebe um token de acordo com as options (usuário e senha)
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);
      const { token } = await tokenRes.json();

      // Se tudo deu certo, armazena o token no browser, recupera as
      //   informações de usuário em 'getUser' e redireciona para a
      //   página 'conta', além de finalizar o 'loading'
      // Se deu errado, o estado 'login' é false e é gerado um erro.
      window.localStorage.setItem("token", token);
      await getUser(token);
      navigate("/conta");
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  /*
    Quando entrar no LoginForm se o user estiver logado e
      seu token estiver no localStorage, o login será efetuado
  */
  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options); // retorna se ok
          if (!response.ok) throw new Error("Token inválido");
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
    /*
      Tem q passar como dependência qualquer estado ou 
        função passado do lado de fora, no caso 'userLogout'
    */
  }, [userLogout]);

  /* 
    O provider é o que 'prover a informação' globalmente
     
    Children é todo o seu app
     
    Value são todas valores e funções escritos acima
  */
  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
