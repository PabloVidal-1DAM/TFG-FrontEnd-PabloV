import React from 'react';
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
import Boton from '../ui/boton';
import { formatearMoneda } from '../../functions/formatos'; 
import { useAdminProductos } from '../../hooks/useAdminProductos'; 

const AdminProductos = () => {
  // Extraigo toda la lógica compleja (estados, peticiones HTTP, FormData para imágenes) 
  // en mi custom hook 'useAdminProductos' para cumplir con el principio de Responsabilidad Única.
  // Así mantengo este componente enfocado exclusivamente en renderizar la interfaz (UI).
  const {
    toast, cargando, productos, proveedores, categorias,
    modalVisible, setModalVisible, producto, setProducto,
    imagenSeleccionada, setImagenSeleccionada, esEdicion,
    abrirModalNuevo, abrirModalEdicion, guardarProducto, eliminarProducto
  } = useAdminProductos();

  // Función que se importa junto al componente de ventana modal de prime react para darle un estilo personalizado a la ventana.
  const confirmarEliminacionVisual = (id) => {
    confirmDialog({
      message: '¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle text-red-500',
      acceptClassName: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
      rejectClassName: 'p-button-text text-gray-600 font-bold py-2 px-4',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      style: { width: '450px', maxHeight: '75vh'},
      accept: () => eliminarProducto(id)
    });
  };

  // Plantilla para la imagen: Si el producto no tiene foto, renderizo un placeholder por defecto
  // directamente en la tabla para mantener la estructura visual y que no quede una celda vacía.
  const plantillaImagen = (fila) => {
    const src = fila.imagen_url ? `http://localhost:8095/storage/${fila.imagen_url}` : 'https://via.placeholder.com/150';
    return <img src={src} alt={fila.nombre} className="w-16 h-16 object-cover shadow-sm rounded border my-3" />;
  };

  const plantillaPrecio = (fila) => <span className="font-bold text-green-700">{formatearMoneda(fila.precio)}</span>;
  
  // Como un producto puede tener N categorías (relación N:M), recorro el array y 
  // pinto un "chip" de Tailwind por cada una para que sea más fácil de leer.
  const plantillaCategorias = (fila) => {
    return fila.categorias?.map(c => <span key={c.id} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1 inline-block mb-1">{c.nombre}</span>);
  };

  const plantillaAcciones = (fila) => (
    <div className="flex gap-2">
      <Boton variante="primario" className="py-2 px-3 text-sm rounded-md" evento={() => abrirModalEdicion(fila)}>
        <i className="pi pi-pencil"></i>
      </Boton>
      <Boton variante="peligro" className="py-2 px-3 text-sm bg-red-600 text-white rounded-md hover:bg-red-700" evento={() => confirmarEliminacionVisual(fila.id)}>
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

      {/* Tabla principal: He optado por inyectar clases de Tailwind directamente en los 
          elementos internos de PrimeReact usando Pass-Through (pt) para mejorar el espaciado. */}
      <DataTable 
        value={productos} 
        paginator 
        rows={10} 
        dataKey="id" 
        emptyMessage="No se encontraron productos."
        className="shadow-sm rounded-lg overflow-hidden"
        pt={{
          bodyRow: { className: 'hover:bg-gray-50 transition-colors' },
          bodyCell: { className: 'py-4' } 
        }}
        loading={cargando}
      >
        <Column body={plantillaImagen} header="Imagen" />
        <Column field="nombre" header="Nombre" sortable className="font-medium" />
        <Column field="precio" body={plantillaPrecio} header="Precio" sortable />
        <Column field="stock" header="Stock" sortable />
        <Column body={plantillaCategorias} header="Categorías" />
        <Column body={plantillaAcciones} header="Acciones" exportable={false} style={{ minWidth: '100px' }} />
      </DataTable>

      <Dialog 
        visible={modalVisible} 
        header={esEdicion ? "Editar Producto" : "Nuevo Producto"} 
        modal 
        className="p-fluid" 
        onHide={() => setModalVisible(false)}
        style={{ width: '500px', maxHeight: '80vh' }}
        contentStyle={{ overflowY: 'auto' }} 
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
              {/* Uso InputNumber en lugar del input de texto estándar para forzar validaciones numéricas 
                  y mostrar automáticamente el formato de moneda EUR. */}
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
            {/* Decidí usar un input file nativo de HTML en lugar de componentes complejos de librerías, 
                ya que permite capturar el archivo físico limpiamente para mi objeto FormData en el hook. */}
            <input type="file" id="imagen" accept="image/jpeg, image/png, image/webp" onChange={(e) => setImagenSeleccionada(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 border border-gray-400 p-2 rounded-md" />
            {esEdicion && !imagenSeleccionada && (
              <small className="text-gray-500 italic mt-2 block">Deja esto vacío si quieres conservar la imagen actual.</small>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4 px-4">
          <Boton variante="contorno" evento={() => setModalVisible(false)} className="py-2 px-4 mb-3 rounded">Cancelar</Boton>
          <Boton variante="primario" evento={guardarProducto} className="py-2 px-4 rounded mb-3" disabled={cargando}>
            {cargando ? <i className="pi pi-spin pi-spinner mr-2"></i> : <i className="pi pi-check mr-2"></i>}
            Guardar
          </Boton>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminProductos;