import React from "react";
import { useState } from "react";

// Hook personalizado que maneja la comunicación con laravel, usando funciones genericas para obtener, enviar y modificar datos.
const useAPI = () => {
  const urlAPI = import.meta.env.VITE_API_URL;
  const [cargando, setCargando] = useState(false);

  // Función auxiliar para montar las cabeceras con el token del backend que le pertenece al usuario
  // y se enviará a Laravel para identificarlo al hacer peticiones protegidas.
  const obtenerCabeceras = () => {
    const token = localStorage.getItem("token_usuario");
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Si hay token, añadimos "Bearer token". Si no, va vacío.
      Authorization: token ? `Bearer ${token}` : "",
    };
  };

  // Función que sirve para traer todo lo de un endpoint o un objeto en específico por su id,
  // dependiendo esto de si se pasa o no como parámetro a esta función.
  const obtenerDatos = async (endpoint, id = "") => {
    setCargando(true);
    try {
      const ruta = id ? `${urlAPI}/${endpoint}/${id}` : `${urlAPI}/${endpoint}`;
      const respuesta = await fetch(ruta, {
        method: "GET",
        headers: obtenerCabeceras(),
      });

      if (!respuesta.ok) throw new Error(respuesta.status);

      const datos = await respuesta.json();
      return datos;
    } catch (e) {
      throw e;
    } finally {
      setCargando(false);
    }
  };

  // Función generica para mandar información al servidor con una peticion HTTP de tipo POST.
  const enviarDatos = async (endpoint, cuerpo) => {
    setCargando(true);
    try {
      const respuesta = await fetch(`${urlAPI}/${endpoint}`, {
        method: "POST",
        headers: obtenerCabeceras(),
        body: JSON.stringify(cuerpo),
      });

      if (!respuesta.ok) {

        if (respuesta.status === 422) {
          // Si es un 422 (Validación), se lee el JSON de Laravel para sacar el mensaje real.
          const errorLaravel = await respuesta.json();
          throw new Error(
            errorLaravel.message || "Error en los datos enviados.",
          );
        }

        if (respuesta.status === 401) {
          throw new Error("Credenciales incorrectas.");
        }

        throw new Error(`Error al enviar datos a la API: ${respuesta.status}`);
      }

      const datos = await respuesta.json();
      return datos;
    } catch (e) {
      throw e;
    } finally {
      setCargando(false);
    }
  };

  const modificarDatos = async (endpoint, cuerpo) => {
    try {
      setCargando(true);
      const respuesta = await fetch(`${urlAPI}/${endpoint}`, {
        method: "PUT",
        headers: obtenerCabeceras(),
        body: JSON.stringify(cuerpo),
      });

      if (!respuesta.ok) {

        // Misma lógica para las actualizaciones en el código 422 (Validación), se lee el JSON de Laravel para sacar el mensaje real.
        if (respuesta.status === 422) {
          const errorLaravel = await respuesta.json();
          throw new Error(errorLaravel.message || "Error de validación al modificar.");
        }

        throw new Error(
          `Error al modificar datos de la API: ${respuesta.status}`,
        );
      }

      const datos = await respuesta.json();
      return datos;
    } catch (e) {
      throw e;
    } finally {
      setCargando(false);
    }
  };

  // Función Específica para enviar archivos (FormData), en mi caso, se usará sobretodo para enviar imágenes de productos al servidor.
  const enviarFormData = async (endpoint, formData, esEdicion = false) => {
    setCargando(true);
    try {
      // Si se está editando, simula un "PUT" a través de un POST, ya que laravel no gestiona bien la subida de archivos en con un PUT original.
      let metodo = "POST";
      if (esEdicion) {
        formData.append("_method", "PUT");
      }

      const token = localStorage.getItem("token_usuario");
      const respuesta = await fetch(`${urlAPI}/${endpoint}`, {
        method: metodo,
        headers: {
          Accept: "application/json",
          Authorization: token ? `Bearer ${token}` : "",
          // IMPORTANTE: Cuando usamos FormData, NO ponemos 'Content-Type'. 
          // El navegador lo genera automáticamente con el 'boundary' necesario para archivos.
        },
        body: formData,
      });

      if (!respuesta.ok) {
        if (respuesta.status === 422) {
          const errorLaravel = await respuesta.json();
          throw new Error(errorLaravel.message || "Error de validación en el formulario.");
        }
        throw new Error(`Error en el servidor: ${respuesta.status}`);
      }

      return await respuesta.json();
    } catch (e) {
      throw e;
    } finally {
      setCargando(false);
    }
  };

  const borrarDatos = async (endpoint) => {
    try {
      setCargando(true);

      const respuesta = await fetch(`${urlAPI}/${endpoint}`, {
        method: "DELETE",
        headers: obtenerCabeceras(),
      });

      const datos = await respuesta.json();
      return datos;
    } catch (e) {
      throw e;
    } finally {
      setCargando(false);
    }
  };

  const datos = {
    obtenerDatos,
    enviarDatos,
    modificarDatos,
    enviarFormData,
    borrarDatos,
    cargando,
  };
  return datos;
};

export default useAPI;
