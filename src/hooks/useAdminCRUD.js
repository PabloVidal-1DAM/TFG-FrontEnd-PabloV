import { useState, useEffect } from 'react';
import useAPI from './useAPI'; // Ajusta esta ruta según la ubicación real de tu archivo

// ==========================================================================
// NOTA TÉCNICA Y ARQUITECTÓNICA:
// ¿Por qué un Custom Hook genérico y no un Contexto Global para la Administración?
//
// 1. Evitar el "God Object" (Objeto Dios): Almacenar el estado de todas las tablas 
//    (usuarios, proveedores, pedidos...) en un solo Provider global haría que la 
//    aplicación consuma memoria innecesaria y sufra de re-renderizados constantes en toda la app.
// 2. Principio DRY (Don't Repeat Yourself): En lugar de repetir la misma lógica de 
//    API (cargar, crear, editar y borrar) en componentes separados para Proveedores, 
//    Categorías o Usuarios, centralizamos toda esa lógica genérica aquí.
// 3. Separación de Responsabilidades (Clean Code): Mantenemos los componentes 
//    visuales (ej: AdminProveedores.jsx) completamente limpios, enfocados solo en 
//    pintar la interfaz (Tablas, Modales), mientras este hook se encarga del "trabajo duro" 
//    con Laravel. Solo necesitamos pasarle el 'endpoint' deseado.
// ==========================================================================

const useAdminCRUD = (endpoint) => {
  const { obtenerDatos, enviarDatos, modificarDatos, borrarDatos, cargando } = useAPI();
  const [datos, setDatos] = useState([]);

  // Carga inicial y refresco de los datos
  const cargarTodo = async () => {
    try {
      // Hacemos la petición genérica al endpoint proporcionado
      const respuesta = await obtenerDatos(`${endpoint}?orden=created_at_desc`);
      
      // Laravel devuelve los arrays paginados dentro de un atributo 'data'. 
      // Si no hay paginación, coge la respuesta directa.
      setDatos(respuesta.data || respuesta); 
    } catch (error) {
      console.error(`Error cargando ${endpoint}:`, error);
    }
  };

  // Se ejecuta automáticamente la primera vez que se carga el componente que use este hook
  useEffect(() => {
    cargarTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  // Función para eliminar un registro
  const eliminarRegistro = async (id) => {
    try {
      await borrarDatos(`${endpoint}/${id}`);
      await cargarTodo(); // Refresca la tabla automáticamente si hay éxito
    } catch (error) {
      throw error; // Se lanza el error para que el componente visual pueda pintar un Toast
    }
  };

  // Función combinada para Crear o Editar dependiendo de si le pasamos un ID
  const guardarRegistro = async (id, datosFormulario) => {
    try {
      if (id) {
        await modificarDatos(`${endpoint}/${id}`, datosFormulario); // PUT (Edición)
      } else {
        await enviarDatos(endpoint, datosFormulario); // POST (Creación)
      }
      await cargarTodo(); // Refresca la tabla automáticamente tras guardar
    } catch (error) {
      throw error; // Se lanza el error para que el componente visual lo capture
    }
  };

  return { 
    datos, 
    cargando, 
    cargarTodo, 
    eliminarRegistro, 
    guardarRegistro 
  };
};

export default useAdminCRUD;