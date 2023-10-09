import './Navbar.css'
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className="navbar-wrapper">
      <Link to="/" className='title'>Inicio</Link>
      <ul>
        <li><NavLink to="/activities">Actividades</NavLink></li>
        {!isLoggedIn && <li><NavLink to="/signup">Registro</NavLink></li>}
        {!isLoggedIn && <li><NavLink to="/login">Acceso</NavLink></li>}
        {isLoggedIn && <li><NavLink to="/profile">Mi cuenta</NavLink></li>}

      </ul>
    </nav>
  );
}

export default Navbar;
