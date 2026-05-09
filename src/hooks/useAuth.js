import { useState } from "react";
import useAPI from "./useAPI";

const useAuth = () => {
  const { enviarDatos } = useAPI();
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

      // 1. Guardamos el TOKEN (como siempre)
      localStorage.setItem("token_tetra", respuesta.token);
      
      // 2. Guardamos el OBJETO USUARIO convertido a texto JSON
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
      const respuesta = await enviarDatos("user/register", {
        name: datosSesion.nombre,
        email: datosSesion.email,
        password: datosSesion.password,
        password_confirmation: datosSesion.password_confirmation,
      });

      localStorage.setItem("token_tetra", respuesta.token);
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
      await enviarDatos("user/logout", {});
    } catch (e) {
      // Si el logout falla (ej: token caducado), seguimos adelante para limpiar el front
    } finally {
      // Limpiamos TODO el localStorage
      localStorage.removeItem("token_tetra");
      localStorage.removeItem("user_tetra");
      
      setUsuario({});
      setSesionIniciada(false);
      setDatosSesion(datosDeSesionInicial);
    }
  };

  return { login, signUp, logout, usuario, sesionIniciada, datosSesion, setDatosSesion };
};

export default useAuth;