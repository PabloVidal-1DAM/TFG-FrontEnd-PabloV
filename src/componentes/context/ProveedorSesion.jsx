import React, { createContext, useState } from "react";
import useAPI from "../../hooks/useAPI";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { validarEmail, validarPassword, validarNombre, validarConfirmacion } from "../../utils/validaciones";

const contextoSesion = createContext();

const ProveedorSesion = ({ children }) => {
  const navegar = useNavigate();
  const {
    datosSesion,
    setDatosSesion,
    sesionIniciada,
    usuario,
    signUp,
    login,
    logout,
  } = useAuth();

  // Estado que guarda una lista de mensajes, lo usará el componente para mostrar los mensajes.
  const [mensajes, setMensajes] = useState([]);

  const ponerMensaje = (tipo, texto) => {
    // He usado como identificador de cada mensaje para react al recorrerlos la fecha + número random.
    const id = Date.now() + Math.random();
    const nuevoMensaje = { id, tipo, texto };

    // Se usa el callback para setear el estado y no saltarse algunos seteos que ocurran muy rápido.
    setMensajes((mensajesActuales) => [...mensajesActuales, nuevoMensaje]);

    // A los tres segundos, el mensaje desaparece de la pantalla.
    setTimeout(() => {
      setMensajes((mensajesActuales) =>
        // Se quita de la lista de mensaje el que caduca a los 3 segundos, dejando los demás.
        mensajesActuales.filter((msg) => msg.id !== id),
      );
    }, 3200);
  };

  const iniciarSesion = async () => {
    try {
      const respuesta = await login();

      ponerMensaje("exito", `Bienvenido, ${respuesta.user.name}`);
      navegar(-1);
    } catch (error) {
      ponerMensaje("error", `Error al iniciar sesion: ${error.message}`);
    }
  };

  const registrarse = async () => {
    try {
      await signUp();
      ponerMensaje("exito", `¡Cuenta creada con exito!`);
      navegar("/");
    } catch (error) {
      ponerMensaje("error", `Error al registarse: ${error.message}`);
    }
  };

  const cerrarSesion = async () => {
    try {
      await logout();
      ponerMensaje("info", "Has cerrado sesión correctamente.");
      navegar("/");
    } catch (error) {
      ponerMensaje("error", `Error al cerrar sesión: ${error.message}`);
    }
  };

  // 2. Función genérica para actualizar el estado global conforme el usuario escribe.
  // Esto nos ahorra hacer un onChange diferente para cada input.
  const actualizarDatosFormulario = (e) => {
    const { name, value } = e.target;
    setDatosSesion({
      ...datosSesion,
      [name]: value,
    });
  };

  // Función que se ejecuta al enviar el formulario
  const manejarLogin = (e) => {
    e.preventDefault();

    // Chivato 2: Comprobamos qué datos exactos tiene el estado ahora mismo
    console.log("📦 2. Datos en el estado:", datosSesion);

    // Se validan que los datos puestos son los correctos.
    const errorEmail = validarEmail(datosSesion?.email);
    const errorPassword = validarPassword(datosSesion?.password);

    // 2. Comprobamos si alguna nos ha devuelto un texto de error
    if (errorEmail) {
      ponerMensaje("error", errorEmail);
      return; // Cortamos la ejecución
    }

    if (errorPassword) {
      ponerMensaje("error", errorPassword);
      return;
    }

    // 3. Si llegamos aquí, ambos devolvieron null. ¡Luz verde!
    iniciarSesion();

    iniciarSesion();
  };

  const manejarRegistro = (e) => {
    e.preventDefault(); 

    const errorNombre = validarNombre(datosSesion?.nombre);
    const errorEmail = validarEmail(datosSesion?.email);
    const errorPassword = validarPassword(datosSesion?.password);
    const errorConfirmacion = validarConfirmacion(datosSesion?.password, datosSesion?.password_confirmation);

    if (errorNombre) { ponerMensaje("error", errorNombre); return; }
    if (errorEmail) { ponerMensaje("error", errorEmail); return; }
    if (errorPassword) { ponerMensaje("error", errorPassword); return; }
    if (errorConfirmacion) { ponerMensaje("error", errorConfirmacion); return; }

    // Si todo está OK, llamamos al backend
    registrarse();
  };

  const datos = {
    // Estados para controlar los formularios de Inicio de sesion y registro.
    datosSesion,
    setDatosSesion,

    // Información del usuario logueado en la sesión actual.
    sesionIniciada,
    usuario,

    // Mensajes que puedan ir ocurriendo durante la sesión.
    mensajes,
    ponerMensaje,

    // Las funciones que ejecutarán los botones "Enviar" de los formularios y la nevgación de toda la web.
    iniciarSesion,
    registrarse,
    cerrarSesion,
    navegar,

    actualizarDatosFormulario,
    manejarLogin,
    manejarRegistro
  };

  return (
    <contextoSesion.Provider value={datos}>{children}</contextoSesion.Provider>
  );
};

export default ProveedorSesion;
export { contextoSesion };
