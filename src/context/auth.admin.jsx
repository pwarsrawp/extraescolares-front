import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./auth.context";

function IsAdmin({ children }) {
  const { isLoading, isAdmin } = useContext(AuthContext);

  if (isLoading) {
    return (
      <h1>Cargando datos...</h1>
    );
  }

  return isAdmin ? (
    <div>{children}</div>
  ) : (
    <Navigate to="/"/>
  );
}

export default IsAdmin;