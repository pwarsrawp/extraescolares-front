import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { fetchAll } from "../functions/api.calls";
const api_url = import.meta.env.VITE_API_URL;
import tablaClases from "../assets/Tabla-actividades-extraescolares-Curso-2023-2024.webp"

function HomePage() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  return (
      <div id="homepage">
        <h1>Lista de espera Extraescolares AFA</h1>
        <br />
        <br />
        <div className="instrucciones">
        <h3>Pasos a seguir para apuntarse correctamente a la lista de espera:</h3>
        <br />
        <ul>
          <li>1.- Registrese en la plataforma a través del enlace Registro</li>
          <li>2.- Acceda a la plataforma con su email y contraseña a través del enlace Acceso</li>
          <li>3.- Pulse en Añadir alumno/a y rellene los datos</li>
          <li>3.- Seleccione el enlace Listas y elija la actividad para la cual quiere entrar en lista de espera</li>
          <li>4.- Una vez estamos en la sección Detalles de Actividad, pinchamos en el icono + y elegimos el alumno a apuntar.</li>
          <li>5.- Recibirá un email de confirmación en los próximos minutos.</li>
          <br />
          <p>A partir de este momento el alumno/a estará en la lista de espera, en caso de quedar alguna plaza libre, recibirá un email de aviso, dispone de 48 horas para confirmar con el AFA, pasado este tiempo el alumno será eliminado de la lista.</p>
        </ul>
        </div>
        <br />
        <br />
        <img src={tablaClases} alt="" />
      </div>




    )



}

export default HomePage;
