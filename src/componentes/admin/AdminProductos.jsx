import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'; 
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import useAPI from '../../hooks/useAPI'; 
import Boton from '../ui/boton';
import { formatearMoneda } from '../../functions/formatos'; 

const productoVacio = {
  nombre: '',
  descripcion: '',
  precio: 0,
  stock: 0,
  proveedor_id: null,
  categorias: []
};

const AdminProductos = () => {
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
      // NOTA SOBRE EL PAGINADOR: Si Laravel usa paginate(15) en su controlador, 
      // la tabla del admin solo verá los primeros 15. 
      // Si te pasa eso, añade un parámetro para traerlos todos de golpe: 'productos?per_page=1000'
      const resProductos = await obtenerDatos('productos?orden=created_at_desc');
      setProductos(resProductos.data || resProductos); 

      const resProv = await obtenerDatos('proveedores');
      setProveedores(resProv.data || resProv);

      const resCat = await obtenerDatos('categorias');
      setCategorias(resCat.data || resCat);
    } catch (error) {
      mostrarMensaje('error', 'Error al cargar los datos');
    }
  };

  const mostrarMensaje = (severidad, texto) => {
    toast.current.show({ severity: severidad, summary: severidad === 'error' ? 'Error' : 'Éxito', detail: texto, life: 3000 });
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

  const confirmarEliminacion = (id) => {
    confirmDialog({
      message: '¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer y eliminará el producto de los carritos activos.',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle text-red-500',
      acceptClassName: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
      rejectClassName: 'p-button-text text-gray-600 font-bold py-2 px-4',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      accept: async () => {
        try {
          await borrarDatos(`productos/${id}`);
          mostrarMensaje('success', 'Producto eliminado con éxito.');
          cargarTodo();
        } catch (error) {
          mostrarMensaje('error', 'No se pudo eliminar el producto.');
        }
      }
    });
  };

  const plantillaImagen = (fila) => {
    const src = fila.imagen_url ? `http://localhost:8095/storage/${fila.imagen_url}` : 'https://via.placeholder.com/150';
    // 1. CORRECCIÓN: Añadido 'my-3' para dar separación vertical a las imágenes
    return <img src={src} alt={fila.nombre} className="w-16 h-16 object-cover shadow-sm rounded border my-3" />;
  };

  const plantillaPrecio = (fila) => <span className="font-bold text-green-700">{formatearMoneda(fila.precio)}</span>;
  
  const plantillaCategorias = (fila) => {
    return fila.categorias?.map(c => <span key={c.id} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1 inline-block mb-1">{c.nombre}</span>);
  };

  const plantillaAcciones = (fila) => (
    <div className="flex gap-2">
      <Boton variante="primario" className="py-2 px-3 text-sm rounded-md" evento={() => abrirModalEdicion(fila)}>
        <i className="pi pi-pencil"></i>
      </Boton>
      <Boton variante="peligro" className="py-2 px-3 text-sm bg-red-600 text-white rounded-md hover:bg-red-700" evento={() => confirmarEliminacion(fila.id)}>
        <i className="pi pi-trash"></i>
      </Boton>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <Toast ref={toast} />
      <ConfirmDialog /> 
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Productos</h1>
          <p className="text-gray-500 text-sm">Administra tu catálogo, precios y stock.</p>
        </div>
        <Boton variante="primario" className="py-2 px-4 rounded-md shadow-sm" evento={abrirModalNuevo}>
          <i className="pi pi-plus mr-2"></i> Nuevo Producto
        </Boton>
      </div>

      <DataTable 
        value={productos} 
        paginator 
        rows={10} 
        dataKey="id" 
        emptyMessage="No se encontraron productos."
        className="shadow-sm rounded-lg overflow-hidden"
        loading={cargando}
      >
        <Column body={plantillaImagen} header="Imagen" />
        <Column field="nombre" header="Nombre" sortable className="font-medium" />
        {/* 2. CORRECCIÓN: Faltaba añadir field="precio" para que funcione la ordenación */}
        <Column field="precio" body={plantillaPrecio} header="Precio" sortable />
        <Column field="stock" header="Stock" sortable />
        <Column body={plantillaCategorias} header="Categorías" />
        <Column body={plantillaAcciones} header="Acciones" exportable={false} style={{ minWidth: '100px' }} />
      </DataTable>

      <Dialog 
        visible={modalVisible} 
        style={{ width: '500px' }} 
        header={esEdicion ? "Editar Producto" : "Nuevo Producto"} 
        modal 
        className="p-fluid" 
        onHide={() => setModalVisible(false)}
      >
        <div className="space-y-5 px-4 pb-6 pt-2">
          
          <div className="field">
            <label htmlFor="nombre" className="font-bold text-gray-700 block mb-1">Nombre</label>
            <InputText id="nombre" value={producto.nombre} onChange={(e) => setProducto({...producto, nombre: e.target.value})} required autoFocus className="w-full border border-gray-400 rounded-md p-2" />
          </div>

          <div className="field">
            <label htmlFor="descripcion" className="font-bold text-gray-700 block mb-1">Descripción</label>
            <InputTextarea id="descripcion" value={producto.descripcion} onChange={(e) => setProducto({...producto, descripcion: e.target.value})} rows={4} autoResize className="w-full border border-gray-400 rounded-md p-2" />
          </div>

          <div className="flex gap-4">
            <div className="field flex-1">
              <label htmlFor="precio" className="font-bold text-gray-700 block mb-1">Precio (€)</label>
              <InputNumber id="precio" value={producto.precio} onValueChange={(e) => setProducto({...producto, precio: e.value})} mode="currency" currency="EUR" locale="es-ES" inputClassName="w-full border border-gray-400 rounded-md p-2" className="w-full" />
            </div>
            <div className="field flex-1">
              <label htmlFor="stock" className="font-bold text-gray-700 block mb-1">Stock</label>
              <InputNumber id="stock" value={producto.stock} onValueChange={(e) => setProducto({...producto, stock: e.value})} inputClassName="w-full border border-gray-400 rounded-md p-2" className="w-full" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="proveedor" className="font-bold text-gray-700 block mb-1">Proveedor</label>
            <Dropdown id="proveedor" value={producto.proveedor_id} onChange={(e) => setProducto({...producto, proveedor_id: e.value})} options={proveedores} optionLabel="nombre" optionValue="id" placeholder="Selecciona un proveedor" className="w-full border border-gray-400 rounded-md items-center" />
          </div>

          <div className="field">
            <label htmlFor="categorias" className="font-bold text-gray-700 block mb-1">Categorías</label>
            <MultiSelect id="categorias" value={producto.categorias} onChange={(e) => setProducto({...producto, categorias: e.value})} options={categorias} optionLabel="nombre" optionValue="id" placeholder="Asignar categorías" display="chip" className="w-full border border-gray-400 rounded-md items-center" />
          </div>

          <div className="field">
            <label htmlFor="imagen" className="font-bold text-gray-700 block mb-1">Fotografía del Producto</label>
            <input type="file" id="imagen" accept="image/jpeg, image/png, image/webp" onChange={(e) => setImagenSeleccionada(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 border border-gray-400 p-2 rounded-md" />
            {esEdicion && !imagenSeleccionada && (
              <small className="text-gray-500 italic mt-2 block">Deja esto vacío si quieres conservar la imagen actual.</small>
            )}
          </div>
          
        </div>

        <div className="flex justify-end gap-2 mt-4 px-4">
          <Boton variante="contorno" evento={() => setModalVisible(false)} className="py-2 px-4 rounded">Cancelar</Boton>
          <Boton variante="primario" evento={guardarProducto} className="py-2 px-4 rounded" disabled={cargando}>
            {cargando ? <i className="pi pi-spin pi-spinner mr-2"></i> : <i className="pi pi-check mr-2"></i>}
            Guardar
          </Boton>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminProductos;