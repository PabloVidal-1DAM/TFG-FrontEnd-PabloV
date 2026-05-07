import React, { useState } from "react";
import useAPI from "./useAPI";

/* Hook personalizado que lleva toda la lógica de las acciones de sesión, así, si mañana quisiese cambiar a otra tecnología
para hacer las peticiones, solo tendría que centrarme aquí, ya que los proveedores beben de este hook para hacerlo. */
const useAuth = () => {
  const { obtenerDatos, enviarDatos } = useAPI();
  const datosDeSesion = {
    email: "",
    password: "",
    nombre: "",
    password_confirmation: ""
  };

  // Aquí se guardarán los datos del usuario cuando inicie sesion
  const [datosSesion, setDatosSesion] = useState(datosDeSesion);
  const [usuario, setUsuario] = useState({});
  const [sesionIniciada, setSesionIniciada] = useState(false);

  console.log(usuario);
  const login = async () => {
    try {
      const respuesta = await enviarDatos("user/login", {
        email: datosSesion.email,
        password: datosSesion.password,
      });

      // Si Laravel nos da el OK, guardamos al usuario en el estado local del hook
      // (Ajusta 'respuesta.user' dependiendo de cómo lo devuelva tu controlador de Laravel)
      setUsuario(respuesta.user);
      setSesionIniciada(true);

      return respuesta;
    } catch (error) {
      throw error;
    }
  };

  const signUp = async () => {
    try {
      const respuesta = await enviarDatos("user/register", {
        name: datosSesion.nombre,
        email: datosSesion.email,
        password: datosSesion.password,
        password_confirmation: datosSesion.password, // Laravel suele pedir confirmación por seguridad
      });

      setDatosSesion(datosDeSesion);
      return respuesta;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await enviarDatos("user/logout", {});
      
      // Limpiamos todos los estados de React que tenian que ver con la sesion.
      setUsuario({});
      setSesionIniciada(false);
      setDatosSesion(datosDeSesionInicial);
      
      return true;
    } catch (error) {
      throw error;
    }
  };

  return {
    login,
    signUp,
    logout,
    usuario,
    sesionIniciada,
    // Estados para los formularios de registro y logeo.
    datosSesion,
    setDatosSesion
  };
};

export default useAuth;
