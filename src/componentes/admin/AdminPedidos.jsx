import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'; 
import { Dropdown } from 'primereact/dropdown';
import Boton from '../ui/boton';
import useAdminCRUD from '../../hooks/useAdminCRUD';
import { formatearMoneda } from '../../functions/formatos'; // Asegúrate de que la ruta sea correcta

const estadosDisponibles = [
  { label: 'Pendiente', value: 'pendiente' },
  { label: 'Enviado', value: 'enviado' },
  { label: 'Entregado', value: 'entregado' }
];

const AdminPedidos = () => {
  const { 
    datos: pedidos, 
    cargando, 
    firstRow, 
    setFirstRow, 
    eliminarRegistro, 
    guardarRegistro 
  } = useAdminCRUD('pedidos'); 

  const toast = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  const mostrarMensaje = (severidad, texto) => {
    toast.current?.show({ severity: severidad, summary: severidad === 'error' ? 'Error' : 'Éxito', detail: texto, life: 3000 });
  };

  const abrirModalEdicion = (pedidoData) => {
    setPedidoSeleccionado({ ...pedidoData });
    setModalVisible(true);
  };

  const guardar = async () => {
    try {
      // Solo actualizamos el estado, que es lo que permite el backend
      await guardarRegistro(pedidoSeleccionado.id, { estado: pedidoSeleccionado.estado });
      mostrarMensaje('success', 'Estado del pedido actualizado correctamente.');
      setModalVisible(false);
    } catch (error) {
      mostrarMensaje('error', error.message || 'Ocurrió un error al actualizar el pedido.');
    }
  };

  const confirmarEliminacionVisual = (id) => {
    confirmDialog({
      message: '¿Estás seguro de que deseas eliminar (cancelar) este pedido? Esta acción no se puede deshacer.',
      header: 'Confirmar Cancelación',
      icon: 'pi pi-exclamation-triangle text-red-500',
      acceptClassName: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
      rejectClassName: 'p-button-text text-gray-600 font-bold py-2 px-4',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      style: { width: '450px', maxHeight: '75vh' },
      accept: async () => {
        try {
          await eliminarRegistro(id);
          mostrarMensaje('success', 'Pedido eliminado con éxito.');
        } catch (error) {
          mostrarMensaje('error', 'No se pudo eliminar el pedido.');
        }
      }
    });
  };

  // --- PLANTILLAS VISUALES ---
  const plantillaFecha = (fila) => {
    const fecha = new Date(fila.created_at);
    return <span className="text-gray-600">{fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>;
  };

  const plantillaUsuario = (fila) => {
    return fila.user ? <span className="font-semibold text-gray-800">{fila.user.nombre}</span> : <span className="text-red-400 italic">Usuario borrado</span>;
  };

  const plantillaTotal = (fila) => {
    return <span className="font-bold text-gray-800">{formatearMoneda(fila.total)}</span>;
  };

  const plantillaEstado = (fila) => {
    const estilos = {
      'pendiente': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'enviado': 'bg-blue-100 text-blue-800 border-blue-200',
      'entregado': 'bg-green-100 text-green-800 border-green-200'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${estilos[fila.estado] || 'bg-gray-100'}`}>
        {fila.estado}
      </span>
    );
  };

  const plantillaAcciones = (fila) => (
    <div className="flex gap-2">
      <Boton variante="primario" className="py-2 px-3 text-sm rounded-md" evento={() => abrirModalEdicion(fila)}>
        <i className="pi pi-eye"></i>
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
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Pedidos</h1>
          <p className="text-gray-500 text-sm">Supervisa las compras de los clientes y actualiza los estados de envío.</p>
        </div>
      </div>

      <DataTable 
        value={pedidos} 
        paginator 
        rows={10} 
        first={firstRow} 
        onPage={(e) => setFirstRow(e.first)}
        dataKey="id" 
        emptyMessage="No hay pedidos registrados."
        className="shadow-sm rounded-lg overflow-hidden"
        pt={{
          headerCell: { className: 'py-4 px-6 bg-gray-50 text-gray-700 font-bold' },
          bodyRow: { className: 'hover:bg-gray-50 transition-colors border-b border-gray-100' },
          bodyCell: { className: 'py-5 px-6' } 
        }}
        loading={cargando}
      >
        <Column header="Fecha" body={plantillaFecha} sortable sortField="created_at" />
        <Column header="Cliente" body={plantillaUsuario} sortable sortField="user.nombre" />
        <Column header="Total" body={plantillaTotal} sortable sortField="total" />
        <Column header="Estado" body={plantillaEstado} sortable sortField="estado" />
        <Column body={plantillaAcciones} header="Detalles" exportable={false} style={{ width: '120px' }} />
      </DataTable>

      {/* MODAL DE DETALLE Y EDICIÓN */}
      <Dialog 
        visible={modalVisible} 
        header="Detalle del Pedido" 
        modal 
        className="p-fluid" 
        onHide={() => setModalVisible(false)}
        style={{ width: '600px', maxHeight: '90vh' }}
        contentStyle={{ overflowY: 'auto' }} 
      >
        {pedidoSeleccionado && (
          <div className="space-y-6 px-4 pb-6 pt-2">
            
            {/* Cabecera Informativa */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-sm text-gray-700 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Cliente</p>
                <p className="font-semibold">{pedidoSeleccionado.user?.nombre}</p>
                <p>{pedidoSeleccionado.user?.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Total Pedido</p>
                <p className="font-bold text-lg text-green-700">{formatearMoneda(pedidoSeleccionado.total)}</p>
              </div>
            </div>

            {/* Cambio de Estado */}
            <div className="field">
              <label htmlFor="estado" className="font-bold text-gray-700 block mb-2">Estado del Envío</label>
              <Dropdown 
                id="estado" 
                value={pedidoSeleccionado.estado} 
                onChange={(e) => setPedidoSeleccionado({...pedidoSeleccionado, estado: e.value})} 
                options={estadosDisponibles} 
                disabled={pedidoSeleccionado.estado === 'entregado'} // Bloqueamos si ya está entregado, según el backend
                className="w-full border border-gray-400 rounded-md" 
              />
              {pedidoSeleccionado.estado === 'entregado' && (
                <small className="text-orange-500 mt-1 block italic">Los pedidos entregados no pueden cambiar de estado.</small>
              )}
            </div>

            {/* Lista de Artículos */}
            <div>
              <h3 className="font-bold text-gray-700 mb-3 border-b pb-2">Artículos del Pedido</h3>
              <ul className="space-y-3">
                {pedidoSeleccionado.items?.map((item) => (
                  <li key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">{item.producto?.nombre || 'Producto borrado'}</span>
                      <span className="text-gray-500">{item.cantidad} x {formatearMoneda(item.precio_historico)}</span>
                    </div>
                    <span className="font-bold text-gray-700">
                      {formatearMoneda(item.cantidad * item.precio_historico)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4 px-4 border-t pt-4">
          <Boton variante="contorno" evento={() => setModalVisible(false)} className="py-2 px-4 rounded mb-3">Cerrar</Boton>
          <Boton 
            variante="primario" 
            evento={guardar} 
            className="py-2 px-4 rounded mb-3" 
            disabled={cargando || pedidoSeleccionado?.estado === 'entregado'}
          >
            {cargando ? <i className="pi pi-spin pi-spinner mr-2"></i> : <i className="pi pi-check mr-2"></i>}
            Guardar Estado
          </Boton>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminPedidos;