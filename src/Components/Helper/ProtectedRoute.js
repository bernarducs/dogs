import React from "react";
import { UserContext } from "../../UserContext";
import { Navigate } from "react-router-dom";

// Recebe um componente caso o login seja verdadeiro,
//   caso contrário, redireciona para a pág de login

// Será usado em App.js

const ProtectedRoute = ({ children }) => {
  const { login } = React.useContext(UserContext);
  return login ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
