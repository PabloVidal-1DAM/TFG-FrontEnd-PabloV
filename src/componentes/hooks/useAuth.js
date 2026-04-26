import React, { useState } from 'react'
import useAPI from './useAPI'

/* Hook personalizado que lleva toda la lógica de las acciones de sesión, así, si mañana quisiese cambiar a otra tecnología
para hacer las peticiones, solo tendría que centrarme aquí, ya que los proveedores beben de este hook para hacerlo. */
const useAuth = () => {

    const {obtenerDatos} = useAPI();
    const datos = {
        email: "",
        password: ""
    };
    const [datosSesion, setDatosSesion] = useState(datos);
    const [sesionIniciada, setSesionIniciada] = useState(false);

    const login = () =>{

    }

  return {};
}

export default useAuth
