import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { postOne } from "../functions/api.calls";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
const api_url = import.meta.env.VITE_API_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { userAuthentication } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await postOne(`${api_url}/auth/login`, {
        email: email,
        password: password
      });

      try {
        localStorage.setItem("authToken", data.token);
      } catch (error) {
        console.error("Error setting authToken in localStorage:", error);
      }

      await userAuthentication();
      navigate("/profile");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.errorMessage
      ) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        setErrorMessage("An error occurred while logging in.");
      }
    }
  };

  return (
    <div id="login">
      <h1>Acceso</h1>
      <form onSubmit={handleLoginSubmit}>
        {/* <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        /> */}
        <TextField
          type="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          type="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          id="outlined-basic"
          label="Contraseña"
          variant="outlined"
        />
        <Button type='submit' variant='contained'>Acceder</Button>
        <div className="form-bottom-text">
          <p>No tiene cuenta aún?</p>
          <Link to={"/signup"}>Crear cuenta</Link>
        </div>
      </form>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : <p></p>}

    </div>
  );
}

export default LoginPage;
