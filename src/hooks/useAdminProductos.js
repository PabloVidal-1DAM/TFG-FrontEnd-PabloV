import { useState, useEffect, useRef } from 'react';
import useAPI from '../hooks/useAPI';

const productoVacio = {
  nombre: '',
  descripcion: '',
  precio: 0,
  stock: 0,
  proveedor_id: null,
  categorias: []
};

// Centraliza la lógica de productos en el panel de Administración. 
// Se aísla de useAdminCRUD porque requiere peticiones simultáneas (categorías/proveedores) y subida de archivos físicos (FormData), 
// lo que rompería la simplicidad del hook genérico.
export const useAdminProductos = () => {
  const { obtenerDatos, borrarDatos, enviarFormData, cargando } = useAPI();
  const toast = useRef(null);

  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [producto, setProducto] = useState(productoVacio);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [esEdicion, setEsEdicion] = useState(false);

  useEffect(() => {
    cargarTodo();
  }, []);

  const cargarTodo = async () => {
    try {
      const resProductos = await obtenerDatos('productos?per_page=1000&orden=created_at_desc');
      setProductos(resProductos.data || resProductos); 

      if (proveedores.length === 0) {
        const resProv = await obtenerDatos('proveedores');
        setProveedores(resProv.data || resProv);
      }
      if (categorias.length === 0) {
        const resCat = await obtenerDatos('categorias');
        setCategorias(resCat.data || resCat);
      }
    } catch (error) {
      mostrarMensaje('error', 'Error al cargar los datos');
    }
  };

  const mostrarMensaje = (severidad, texto) => {
    toast.current?.show({ severity: severidad, summary: severidad === 'error' ? 'Error' : 'Éxito', detail: texto, life: 3000 });
  };

  const abrirModalNuevo = () => {
    setProducto(productoVacio);
    setImagenSeleccionada(null);
    setEsEdicion(false);
    setModalVisible(true);
  };

  const abrirModalEdicion = (prodData) => {
    const categoriasIds = prodData.categorias ? prodData.categorias.map(c => c.id) : [];
    setProducto({ ...prodData, categorias: categoriasIds });
    setImagenSeleccionada(null); 
    setEsEdicion(true);
    setModalVisible(true);
  };

  const guardarProducto = async () => {
    try {
      const formData = new FormData();
      formData.append('nombre', producto.nombre);
      formData.append('descripcion', producto.descripcion || '');
      formData.append('precio', producto.precio);
      formData.append('stock', producto.stock);
      formData.append('proveedor_id', producto.proveedor_id);
      
      if (producto.categorias && producto.categorias.length > 0) {
        producto.categorias.forEach((idCat, index) => {
          formData.append(`categorias[${index}]`, idCat);
        });
      }

      if (imagenSeleccionada) {
        formData.append('imagen', imagenSeleccionada);
      }

      const endpoint = esEdicion ? `productos/${producto.id}` : 'productos';
      await enviarFormData(endpoint, formData, esEdicion);

      mostrarMensaje('success', `Producto ${esEdicion ? 'actualizado' : 'creado'} correctamente.`);
      setModalVisible(false);
      cargarTodo(); 
    } catch (error) {
      mostrarMensaje('error', error.message);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await borrarDatos(`productos/${id}`);
      mostrarMensaje('success', 'Producto eliminado con éxito.');
      cargarTodo();
    } catch (error) {
      mostrarMensaje('error', 'No se pudo eliminar el producto.');
    }
  };

  return {
    toast,
    cargando,
    productos,
    proveedores,
    categorias,
    modalVisible,
    setModalVisible,
    producto,
    setProducto,
    imagenSeleccionada,
    setImagenSeleccionada,
    esEdicion,
    abrirModalNuevo,
    abrirModalEdicion,
    guardarProducto,
    eliminarProducto
  };
};