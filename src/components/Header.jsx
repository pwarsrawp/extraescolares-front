import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0ead99;
  .title {
    font-size: 1.5rem;
    margin: 1rem;
    font-weight: 600;
    text-decoration: none;
    color: white;
  }
  ul {
    display: flex;
  }
  ul li {
    list-style: none;
  }
  ul li a {
    display: block;
    text-decoration: none;
    color: white;
    padding: 0.5rem;
    margin: 0 0.5rem;
    border-radius: 0.3rem;
  }
`;

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavContainer>
      <Link to='/' className='title'>
        Inicio
      </Link>
      <ul>
        <li>
          <NavLink to='/activities'>Actividades</NavLink>
        </li>
        {!isLoggedIn && (
          <li>
            <NavLink to='/signup'>Registro</NavLink>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <NavLink to='/login'>Acceso</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to='/profile'>Mi cuenta</NavLink>
          </li>
        )}
      </ul>
    </NavContainer>
  );
}

export default Navbar;
