import { useState, useEffect } from 'react';
import useAPI from './useAPI'; // Ajusta esta ruta según la ubicación real de tu archivo

// ¿Por qué un Custom Hook genérico y no un Contexto para la Administración?
//
// 1. Almacenar el estado de todas las tablas (usuarios, proveedores, pedidos...) en un solo Proveedor
//    haría que la aplicación consuma memoria innecesaria y sufra de re-renderizados constantes en toda la app.
// 2. En lugar de repetir la misma lógica de API (cargar, crear, editar y borrar) en componentes separados para 
//    Proveedores, Categorías o Usuarios, centralizamos toda esa lógica genérica aquí.
// 3. Manteniene los componentes visuales (ej: AdminProveedores.jsx) completamente limpios, enfocados solo en 
//    pintar la interfaz (Tablas, Modales), mientras este hook se encarga del "trabajo duro" 
//    con Laravel, Solo se necesita pasarle el 'endpoint' deseado.

const useAdminCRUD = (endpoint) => {
  const { obtenerDatos, enviarDatos, modificarDatos, borrarDatos, cargando } = useAPI();
  const [datos, setDatos] = useState([]);
  
  // --- NUEVO: ESTADO PARA EL PAGINADOR DE PRIMEREACT ---
  const [firstRow, setFirstRow] = useState(0);

  const cargarTodo = async () => {
    try {
      // Añadimos per_page=1000 para que Laravel nos devuelva todos y PrimeReact ordene
      const respuesta = await obtenerDatos(`${endpoint}?per_page=1000&orden=created_at_desc`);
      setDatos(respuesta.data || respuesta); 
    } catch (error) {
      console.error(`Error cargando ${endpoint}:`, error);
    }
  };

  useEffect(() => {
    cargarTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  const eliminarRegistro = async (id) => {
    try {
      await borrarDatos(`${endpoint}/${id}`);
      setFirstRow(0); // Volvemos a la página 1
      await cargarTodo(); 
    } catch (error) {
      throw error; 
    }
  };

  const guardarRegistro = async (id, datosFormulario) => {
    try {
      if (id) {
        await modificarDatos(`${endpoint}/${id}`, datosFormulario);
      } else {
        await enviarDatos(endpoint, datosFormulario);
      }
      setFirstRow(0); // Volvemos a la página 1
      await cargarTodo(); 
    } catch (error) {
      throw error; 
    }
  };

  return { 
    datos, 
    cargando, 
    firstRow,    
    setFirstRow,  
    cargarTodo, 
    eliminarRegistro, 
    guardarRegistro 
  };
};

export default useAdminCRUD;