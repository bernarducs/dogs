/*
  Concentra todas a funções que fazem requisições com a API
*/

export const API_URL = "https://dogsapi.origamid.dev/json";

export function TOKEN_POST(body) {
  // passa usuario e senha como body e recebe uma url e as options
  return {
    url: API_URL + "/jwt-auth/v1/token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_VALIDATE_POST(token) {
  // passa-se um token e recebe uma autorização com url e options
  return {
    url: API_URL + "/jwt-auth/v1/token/validate",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function USER_GET(token) {
  // puxa o usuário em si. passa-se um token
  return {
    url: API_URL + "/api/user",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function USER_POST(body) {
  // puxa o usuário em si. passa-se username, email, password
  return {
    url: API_URL + "/api/user",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}
