import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./auth.context";

function IsPrivate({ children }) {
  const { isLoading, isLoggedIn } = useContext(AuthContext);

  if (isLoading) {
    return (
      <h1>Cargando datos...</h1>
    );
  }

  return isLoggedIn ? (
    <div>{children}</div>
  ) : (
    <Navigate to="/login" replace={true} />
  );
}

export default IsPrivate;
