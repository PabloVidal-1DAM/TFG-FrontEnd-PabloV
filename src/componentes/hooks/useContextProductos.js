import React, { useContext } from 'react'
import { contextoProductos } from '../context/ProveedorProductos'

const useContextProductos = () => {
    const contexto = useContext(contextoProductos);

    if(!contexto){
        throw new Error("El hook useContextProductos debe usarse en ProvedorProductos");
    }
  return contexto;
}

export default useContextProductos
