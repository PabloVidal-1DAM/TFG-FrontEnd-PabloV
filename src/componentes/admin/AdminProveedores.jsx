import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'; 
import { InputText } from 'primereact/inputtext';
import Boton from '../ui/boton';
import useAdminCRUD from '../../hooks/useAdminCRUD'; 

const proveedorVacio = {
  nombre: '',
  cif: '',
  email: '',
  telefono: '',
  direccion: ''
};

const AdminProveedores = () => {
  // Utilizo mi Custom Hook 'useAdminCRUD' pasándole el endpoint 'proveedores'.
  // Esto me permite abstraer toda la lógica de llamadas HTTP, paginación local y estados de carga.
  // Cumplo así el principio DRY y el principio de Responsabilidad Única, creo vamos...
  const { 
    datos: proveedores, 
    cargando, 
    firstRow, 
    setFirstRow, 
    eliminarRegistro, 
    guardarRegistro 
  } = useAdminCRUD('proveedores');

  const toast = useRef(null);

  // Estados locales exclusivos para la interfaz gráfica.
  const [modalVisible, setModalVisible] = useState(false);
  const [proveedor, setProveedor] = useState(proveedorVacio);
  const [esEdicion, setEsEdicion] = useState(false);

  // Centralizo la lógica de notificaciones Toast, ya que es fundamental
  //  dar feedback inmediato al administrador sobre el resultado de sus acciones.
  const mostrarMensaje = (severidad, texto) => {
    toast.current?.show({ severity: severidad, summary: severidad === 'error' ? 'Error' : 'Éxito', detail: texto, life: 3000 });
  };

  const abrirModalNuevo = () => {
    setProveedor(proveedorVacio);
    setEsEdicion(false);
    setModalVisible(true);
  };

  const abrirModalEdicion = (provData) => {
    // Se clona el objeto provData con el spread operator {...provData} para no mutar 
    // el estado original de la tabla accidentalmente si el usuario cancela la edición.
    setProveedor({ ...provData });
    setEsEdicion(true);
    setModalVisible(true);
  };

  const guardar = async () => {
    try {
      // Delego el guardado al hook. Si 'esEdicion' es true, le paso el ID para que haga un PUT.
      // Si es false, le paso null para que haga un POST (creación).
      await guardarRegistro(esEdicion ? proveedor.id : null, proveedor);
      mostrarMensaje('success', `Proveedor ${esEdicion ? 'actualizado' : 'creado'} correctamente.`);
      setModalVisible(false);
    } catch (error) {
      mostrarMensaje('error', error.message || 'Ocurrió un error al guardar el proveedor.');
    }
  };

  // Ventana modal antes de borrar el proveedor con el componente de prime react, esta es la plantilla visual custom que he hecho.
  const confirmarEliminacionVisual = (id) => {
    confirmDialog({
      message: '¿Estás seguro de que deseas eliminar este proveedor? Esta acción no se puede deshacer.',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle text-red-500',
      acceptClassName: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
      rejectClassName: 'p-button-text text-gray-600 font-bold py-2 px-4',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      style: { width: '450px', maxHeight: '75vh' },
      accept: async () => {
        try {
          await eliminarRegistro(id);
          mostrarMensaje('success', 'Proveedor eliminado con éxito.');
        } catch (error) {
          mostrarMensaje('error', 'No se pudo eliminar el proveedor.');
        }
      }
    });
  };

  // Plantilla para la columna de acciones. Se inyecta en cada fila del DataTable como botones.
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
      {/* Elementos flotantes manejados por referencia */}
      <Toast ref={toast} />
      <ConfirmDialog /> 
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Proveedores</h1>
          <p className="text-gray-500 text-sm">Administra los datos de contacto de tus distribuidores.</p>
        </div>
        <Boton variante="primario" className="py-2 px-4 rounded-md shadow-sm" evento={abrirModalNuevo}>
          <i className="pi pi-plus mr-2"></i> Nuevo Proveedor
        </Boton>
      </div>

      {/* DataTable: Hago uso de la propiedad 'pt' (Pass-Through) nativa de PrimeReact 
          para inyectar clases de Tailwind directamente en el DOM interno de la tabla. 
          Esto me permite dar mayor "aire" y espaciado (py-5, px-6) a las filas, evitando 
          el diseño apelmazado por defecto que me ha pasado tantísimas veces ya. */}
      <DataTable 
        value={proveedores} 
        paginator 
        rows={10} 
        first={firstRow} 
        onPage={(e) => setFirstRow(e.first)}
        dataKey="id" 
        emptyMessage="No se encontraron proveedores."
        className="shadow-sm rounded-lg overflow-hidden"
        pt={{
          headerCell: { className: 'py-4 px-6 bg-gray-50 text-gray-700 font-bold' },
          bodyRow: { className: 'hover:bg-gray-50 transition-colors border-b border-gray-100' },
          bodyCell: { className: 'py-5 px-6 text-gray-600' } 
        }}
        loading={cargando}
      >
        <Column field="nombre" header="Nombre" sortable className="font-medium" />
        <Column field="cif" header="CIF / NIF" sortable />
        <Column field="email" header="Email" sortable />
        <Column field="telefono" header="Teléfono" sortable />
        <Column body={plantillaAcciones} header="Acciones" exportable={false} style={{ minWidth: '100px' }} />
      </DataTable>

      {/* Reutilizo el mismo Dialog tanto para Crear como para Editar, 
          apoyándome en el estado 'esEdicion' para cambiar títulos y lógicas. */}
      <Dialog 
        visible={modalVisible} 
        header={esEdicion ? "Editar Proveedor" : "Nuevo Proveedor"} 
        modal 
        className="p-fluid" 
        onHide={() => setModalVisible(false)}
        style={{ width: '500px', maxHeight: '80vh' }}
        contentStyle={{ overflowY: 'auto' }} 
      >
        <div className="space-y-5 px-4 pb-6 pt-2">
          <div className="field">
            <label htmlFor="nombre" className="font-bold text-gray-700 block mb-1">Nombre Comercial</label>
            <InputText id="nombre" value={proveedor.nombre} onChange={(e) => setProveedor({...proveedor, nombre: e.target.value})} required autoFocus className="w-full border border-gray-400 rounded-md p-2" />
          </div>

          <div className="flex gap-4">
            <div className="field flex-1">
              <label htmlFor="cif" className="font-bold text-gray-700 block mb-1">CIF / NIF</label>
              <InputText id="cif" value={proveedor.cif} onChange={(e) => setProveedor({...proveedor, cif: e.target.value})} className="w-full border border-gray-400 rounded-md p-2" />
            </div>
            <div className="field flex-1">
              <label htmlFor="telefono" className="font-bold text-gray-700 block mb-1">Teléfono</label>
              <InputText id="telefono" value={proveedor.telefono} onChange={(e) => setProveedor({...proveedor, telefono: e.target.value})} className="w-full border border-gray-400 rounded-md p-2" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email" className="font-bold text-gray-700 block mb-1">Correo Electrónico</label>
            <InputText id="email" type="email" value={proveedor.email} onChange={(e) => setProveedor({...proveedor, email: e.target.value})} className="w-full border border-gray-400 rounded-md p-2" />
          </div>

          <div className="field">
            <label htmlFor="direccion" className="font-bold text-gray-700 block mb-1">Dirección Física</label>
            <InputText id="direccion" value={proveedor.direccion} onChange={(e) => setProveedor({...proveedor, direccion: e.target.value})} className="w-full border border-gray-400 rounded-md p-2" />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4 px-4">
          <Boton variante="contorno" evento={() => setModalVisible(false)} className="py-2 px-4 mb-3 rounded">Cancelar</Boton>
          <Boton variante="primario" evento={guardar} className="py-2 px-4 rounded mb-3" disabled={cargando}>
            {cargando ? <i className="pi pi-spin pi-spinner mr-2"></i> : <i className="pi pi-check mr-2"></i>}
            Guardar
          </Boton>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminProveedores;