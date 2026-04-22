import React, { createContext, useState } from 'react'
import useAPI from '../hooks/useAPI'
import { useNavigate } from 'react-router-dom';

const contextoSesion = createContext();

const ProveedorSesion = ({children}) => {
    const {obtenerDatos} = useAPI();
    const navegar = useNavigate();

    // 1. Ahora guardamos una LISTA de mensajes (array vacío)
    const [mensajes, setMensajes] = useState([]);

    const ponerMensaje = (tipo, texto) => {
      // 2. Creamos un ID único para este mensaje (usando la fecha exacta en milisegundos)
      // Así React sabrá cuál es cuál cuando queramos borrarlo
      const id = Date.now() + Math.random(); 
      const nuevoMensaje = { id, tipo, texto };

      // 3. Lo añadimos a la lista usando el "modo seguro" (callback)
      setMensajes((mensajesActuales) => [...mensajesActuales, nuevoMensaje]);
      
      // 4. Programamos SU propia destrucción buscando por su ID
      setTimeout(() => {
          setMensajes((mensajesActuales) => 
              // Filtramos para quedarnos con todos MENOS el que acaba de caducar
              mensajesActuales.filter((msg) => msg.id !== id)
          );
      }, 3200); 
    }

    const datos = {
        navegar,
        mensajes,      // Exportamos la lista entera en plural
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