import { Link } from 'react-router-dom';

function Error() {
  return (
    <div>
      <h1>Error 404</h1>
      <h2>La ruta seleccionada no existe</h2>
      <Link to='/'>
        <button>Volver a Inicio</button>
      </Link>
    </div>
  );
}

export default Error;
