import React, { useContext } from 'react'
import {contextoSesion} from "../componentes/context/ProveedorSesion";
const useContextSesion = () => {
  const contexto = useContext(contextoSesion);

  if(!contexto){
    throw new Error("El hook useContextSesion debe usarse en ProveedorSesion");
  }
  return contexto;
}

export default useContextSesion
