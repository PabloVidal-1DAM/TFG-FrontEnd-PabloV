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

  // Estado que guardará los errores cometidos en los formularios de inicio/registro de sesión.
  const [erroresFormulario, setErroresFormulario] = useState({});

  const ponerMensaje = (tipo, texto) => {

    // He usado como identificador de cada mensaje para react al recorrerlos la fecha + número random.
    const id = Date.now() + Math.random();
    const nuevoMensaje = { id, tipo, texto };

    // Se usa el callback para setear el estado y no saltarse algunos setters que ocurran muy rápido.
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

      ponerMensaje("exito", `Bienvenido, ${respuesta.user.nombre}`);
      navegar("/catalogo");
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
      navegar("/");
    }
  };

  // Función genérica para actualizar el estado de cualquier campo del formulario conforme el usuario escribe.
  const actualizarDatosFormulario = (e) => {
    const { name, value } = e.target;
    setDatosSesion({
      ...datosSesion,
      [name]: value,
    });

    setErroresFormulario({
      ...erroresFormulario, 
      [name]: null
    });
  };

  // Función que se ejecuta al enviar el formulario
  const manejarLogin = (e) => {
    e.preventDefault();

    // Se validan que los datos puestos son los correctos.
    const errorEmail = validarEmail(datosSesion?.email);
    const errorPassword = validarPassword(datosSesion?.password);

    // En caso de haber un error, se almacenan en un objeto JSON en el estado de errores de formulario.
    setErroresFormulario({email: errorEmail, password: errorPassword})

    // Si algún campo no ha validado, se le hace saber al usuario.
    if (errorEmail) {
      ponerMensaje("error", errorEmail);
      return; // Cortamos la ejecución
    }

    if (errorPassword) {
      ponerMensaje("error", errorPassword);
      return;
    }

    // Si no hay errores y todo está valido, se inicia sesión.
    iniciarSesion();
  };

  const manejarRegistro = (e) => {
    e.preventDefault(); 
    console.log("📝 Intentando registrar con:", datosSesion);

    const errorNombre = validarNombre(datosSesion?.nombre);
    const errorEmail = validarEmail(datosSesion?.email);
    const errorPassword = validarPassword(datosSesion?.password);
    const errorConfirmacion = validarConfirmacion(datosSesion?.password, datosSesion?.password_confirmation);

    setErroresFormulario({
      nombre: errorNombre,
      email: errorEmail,
      password: errorPassword,
      password_confirmation: errorConfirmacion
    });

    if (errorNombre) { ponerMensaje("error", errorNombre); return; }
    if (errorEmail) { ponerMensaje("error", errorEmail); return; }
    if (errorPassword) { ponerMensaje("error", errorPassword); return; }
    if (errorConfirmacion) { ponerMensaje("error", errorConfirmacion); return; }

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
    erroresFormulario,

    // Las funciones que ejecutarán los botones "Enviar" de los formularios y la nevgación de toda la web.
    iniciarSesion,
    registrarse,
    cerrarSesion,
    navegar,

    // Formularios de Inicio/Registro de sesión.
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
