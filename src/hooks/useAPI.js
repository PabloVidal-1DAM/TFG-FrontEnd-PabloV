import React from "react";
import { useState } from "react";

const useAPI = () => {
  const urlAPI = "http://localhost:8095/api";
  const [cargando, setCargando] = useState(false);

  // Función auxiliar para montar las cabeceras con el token del backend que le pertenece al usuario.
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
        method: 'GET',
        headers: obtenerCabeceras()
      });

      if (!respuesta.ok)
        throw new Error(
          `Error al obtener datos de la API: ${respuesta.status}`,
        );

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
        const errorData = await respuesta.json();
        // Lanzamos el mensaje que viene de Laravel, o uno genérico
        throw new Error(
          errorData.message ||
            `Error al enviar los datos a la API: ${respuesta.status}`,
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

  const datos = {
    obtenerDatos,
    enviarDatos,
    cargando,
  };
  return datos;
};

export default useAPI;
