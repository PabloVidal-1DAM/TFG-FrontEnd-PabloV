import React, { createContext, useEffect, useState } from 'react'
import useAPI from '../hooks/useAPI';

const contextoProductos = createContext();
const ProveedorProductos = ({children}) => {
    const {obtenerDatos, cargando} = useAPI();

    const [listaProductos, setListaProductos] = useState([]);

    const cargarProductos = async () =>{
        const productos = await obtenerDatos("productos");
        console.log(productos);
        setListaProductos(productos.data);
    }

    useEffect(() =>{
        cargarProductos();
    }, [])

    const datos = {
        listaProductos,
        cargando
    };

  return (
    <contextoProductos.Provider value={datos}>
        {children}
    </contextoProductos.Provider>
  )
}

export default ProveedorProductos;
export {contextoProductos};
