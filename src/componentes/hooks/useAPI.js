import React from 'react'
import { useState } from 'react';

const useAPI = () => {
    const urlAPI = "http://localhost:8095/api";
    const [cargando, setCargando] = useState(false);

    const obtenerDatos = async(endpoint, id = '') =>{
        setCargando(true);
        try{
            const ruta = id ? `${urlAPI}/${endpoint}/${id}` : `${urlAPI}/${endpoint}`;
            const respuesta = await fetch(ruta);
            
            if (!respuesta.ok) throw new Error(`Error al obtener datos de la API: ${respuesta.status}`);

            const datos = await respuesta.json();
            return datos;

        }catch(e){
            throw e;
        }finally{
            setCargando(false);
        }
    }



    const datos = {
        obtenerDatos,
        cargando
    };
  return datos;
}

export default useAPI
