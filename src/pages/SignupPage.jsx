import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postOne } from "../functions/api.calls";
import { Button, TextField } from "@mui/material";
const api_url = import.meta.env.VITE_API_URL;

function SignupPage() {
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [memberNumber, setMemberNumber] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await postOne(`${api_url}/auth/signup`, {
        email,
        fullname,
        memberNumber,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.log("Issue with the sign up: ", error);
    }
  };

  return (
    <div id="signup">
      <h1>Registro</h1>
      <form onSubmit={handleSignup}>
        <TextField
          value={fullname}
          required
          onChange={(event) => {
            setFullName(event.target.value);
          }}
          id="outlined-basic"
          label="Nombre completo familiar al cargo"
          variant="outlined"
        />
        <TextField
          type="email"
          value={email}
          required
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          value={memberNumber}
          onChange={(event) => {
            setMemberNumber(event.target.value);
          }}
          id="outlined-basic"
          label="Nº de socio (si procede)"
          variant="outlined"
        />
        <TextField
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          id="outlined-basic"
          label="Contraseña"
          variant="outlined"
        />        
        <Button type="submit" variant='contained'>Enviar</Button>
      </form>

      <div className="form-bottom-text">
        <p>Ya está registrado/a?</p>
        <Link to={"/login"}>Acceso</Link>
      </div>
    </div>
  );
}

export default SignupPage;
