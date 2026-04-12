import React, { createContext } from 'react'
import useAPI from '../hooks/useAPI'
import { useNavigate } from 'react-router-dom';

const contextoSesion = createContext();
const ProveedorSesion = ({children}) => {
    const {obtenerDatos} = useAPI();

    const navegar = useNavigate();

    const datos = {
        navegar
    };
  return (
    <contextoSesion.Provider value={datos}>{children}</contextoSesion.Provider>
  )
}

export default ProveedorSesion;
export {contextoSesion};
