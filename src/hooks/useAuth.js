import { useState } from "react";
import useAPI from "./useAPI";

// Hook personalizado que contiene toda la lógica del registro e inicio de sesión de mi aplicación web.
const useAuth = () => {
  const { enviarDatos, obtenerDatos } = useAPI();
  const datosDeSesionInicial = { email: "", password: "", nombre: "", password_confirmation: "" };

  // Al arrancar, intentamos leer el usuario del localStorage. 
  // Si existe, lo convertimos de texto a objeto. Si no, objeto vacío.
  const [usuario, setUsuario] = useState(() => {
    const userGuardado = localStorage.getItem("user_tetra");
    return userGuardado ? JSON.parse(userGuardado) : {};
  });

  // La sesión está iniciada si el objeto usuario tiene algo (por ejemplo, un id)
  const [sesionIniciada, setSesionIniciada] = useState(!!usuario.id);
  const [datosSesion, setDatosSesion] = useState(datosDeSesionInicial);

  const login = async () => {
    try {
      const respuesta = await enviarDatos("user/login", {
        email: datosSesion.email,
        password: datosSesion.password,
      });

      // Guarda el TOKEN para usarlo en futuras peticiones.
      localStorage.setItem("token_usuario", respuesta.token);
      
      // Guarda el OBJETO usuario convertido a texto JSON.
      localStorage.setItem("user_tetra", JSON.stringify(respuesta.user));

      setUsuario(respuesta.user);
      setSesionIniciada(true);
      return respuesta;
    } catch (error) {
      throw error;
    }
  };

  const signUp = async () => {
    try {
      // Se envía al servidor los datos del formulario de registro para dar de alta al usuario.
      const respuesta = await enviarDatos("user/register", {
        nombre: datosSesion.nombre,
        email: datosSesion.email,
        password: datosSesion.password,
        password_confirmation: datosSesion.password_confirmation,
      });

      localStorage.setItem("token_usuario", respuesta.token);
      localStorage.setItem("user_tetra", JSON.stringify(respuesta.user));

      setUsuario(respuesta.user);
      setSesionIniciada(true);
      return respuesta;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await obtenerDatos("user/logout");
    } catch (e) {
      throw error;
    } finally {
      // Se limpia TODO el localStorage y estados que tienen que ver con la sesión del usuario.
      localStorage.removeItem("token_usuario");
      localStorage.removeItem("user_tetra");
      
      setUsuario({});
      setSesionIniciada(false);
      setDatosSesion(datosDeSesionInicial);
    }
  };

  return { login, signUp, logout, usuario, sesionIniciada, datosSesion, setDatosSesion };
};

export default useAuth;