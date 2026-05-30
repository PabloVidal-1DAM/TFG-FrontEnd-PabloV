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
  const { 
    datos: proveedores, 
    cargando, 
    firstRow, 
    setFirstRow, 
    eliminarRegistro, 
    guardarRegistro 
  } = useAdminCRUD('proveedores');

  const toast = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [proveedor, setProveedor] = useState(proveedorVacio);
  const [esEdicion, setEsEdicion] = useState(false);

  const mostrarMensaje = (severidad, texto) => {
    toast.current?.show({ severity: severidad, summary: severidad === 'error' ? 'Error' : 'Éxito', detail: texto, life: 3000 });
  };

  const abrirModalNuevo = () => {
    setProveedor(proveedorVacio);
    setEsEdicion(false);
    setModalVisible(true);
  };

  const abrirModalEdicion = (provData) => {
    setProveedor({ ...provData });
    setEsEdicion(true);
    setModalVisible(true);
  };

  const guardar = async () => {
    try {
      await guardarRegistro(esEdicion ? proveedor.id : null, proveedor);
      mostrarMensaje('success', `Proveedor ${esEdicion ? 'actualizado' : 'creado'} correctamente.`);
      setModalVisible(false);
    } catch (error) {
      mostrarMensaje('error', error.message || 'Ocurrió un error al guardar el proveedor.');
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Proveedores</h1>
          <p className="text-gray-500 text-sm">Administra los datos de contacto de tus distribuidores.</p>
        </div>
        <Boton variante="primario" className="py-2 px-4 rounded-md shadow-sm" evento={abrirModalNuevo}>
          <i className="pi pi-plus mr-2"></i> Nuevo Proveedor
        </Boton>
      </div>

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
          // Aumentamos el padding vertical de las filas y añadimos una pequeña separación visual
          bodyRow: { className: 'hover:bg-gray-50 transition-colors border-b border-gray-100' },
          // Aumentamos el padding vertical (py-5) para que los datos no estén tan pegados
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