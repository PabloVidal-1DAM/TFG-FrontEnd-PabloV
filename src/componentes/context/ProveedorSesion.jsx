import React, { createContext, useState } from 'react'
import useAPI from '../hooks/useAPI'
import { useNavigate } from 'react-router-dom';

const contextoSesion = createContext();

const ProveedorSesion = ({children}) => {

    // Aquí se guardarán los datos del usuario cuando inicie sesion
    const [usuario, setUsuario] = useState(null);

    const {obtenerDatos} = useAPI();
    const navegar = useNavigate();

    // Estado que guarda una lista de mensajes, lo usará el componente para mostrar los mensajes.
    const [mensajes, setMensajes] = useState([]);

    const ponerMensaje = (tipo, texto) => {
      // He usado como identificador de cada mensaje para react al recorrerlos la fecha + número random.
      const id = Date.now() + Math.random(); 
      const nuevoMensaje = { id, tipo, texto };

      // Se usa el callback para setear el estado y no saltarse algunos seteos que ocurran muy rápido.
      setMensajes((mensajesActuales) => [...mensajesActuales, nuevoMensaje]);
      
      // A los tres segundos, el mensaje desaparece de la pantalla.
      setTimeout(() => {
          setMensajes((mensajesActuales) => 
              // Se quita de la lista de mensaje el que caduca a los 3 segundos, dejando los demás.
              mensajesActuales.filter((msg) => msg.id !== id)
          );
      }, 3200); 
    }

    const datos = {
        navegar,
        mensajes,    
        ponerMensaje   
    };

  return (
    <contextoSesion.Provider value={datos}>
        {children}
    </contextoSesion.Provider>
  )
}

export default ProveedorSesion;
export {contextoSesion};