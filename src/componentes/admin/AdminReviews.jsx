import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'; 
import { InputTextarea } from 'primereact/inputtextarea';
import { Rating } from 'primereact/rating';
import Boton from '../ui/boton';
import useAdminCRUD from '../../hooks/useAdminCRUD'; 

const reviewVacia = {
  valoracion: 0,
  comentario: ''
};

const AdminReviews = () => {
  const { 
    datos: reviews, 
    cargando, 
    firstRow, 
    setFirstRow, 
    eliminarRegistro, 
    guardarRegistro 
  } = useAdminCRUD('reviews'); 

  const toast = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [review, setReview] = useState(reviewVacia);

  const mostrarMensaje = (severidad, texto) => {
    toast.current?.show({ severity: severidad, summary: severidad === 'error' ? 'Error' : 'Éxito', detail: texto, life: 3000 });
  };

  const abrirModalEdicion = (revData) => {
    setReview({ ...revData });
    setModalVisible(true);
  };

  const guardar = async () => {
    try {
      // Como el admin no crea reviews, siempre enviamos un PUT con el ID.
      // Recuerda que UpdateReviewRequest solo permite modificar 'valoracion' y 'comentario'.
      await guardarRegistro(review.id, {
        valoracion: review.valoracion,
        comentario: review.comentario
      });
      mostrarMensaje('success', 'Review actualizada correctamente.');
      setModalVisible(false);
    } catch (error) {
      mostrarMensaje('error', error.message || 'Ocurrió un error al guardar la review.');
    }
  };

  const confirmarEliminacionVisual = (id) => {
    confirmDialog({
      message: '¿Estás seguro de que deseas eliminar esta reseña? Esta acción no se puede deshacer.',
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
          mostrarMensaje('success', 'Review eliminada con éxito.');
        } catch (error) {
          mostrarMensaje('error', 'No se pudo eliminar la review.');
        }
      }
    });
  };

  // --- PLANTILLAS VISUALES PARA LA TABLA ---
  const plantillaEstrellas = (fila) => {
    return <Rating value={fila.valoracion} readOnly cancel={false} className="gap-1" />;
  };

  const plantillaUsuario = (fila) => {
    return fila.user ? <span className="font-semibold text-gray-800">{fila.user.nombre}</span> : <span className="text-red-400 italic">Usuario borrado</span>;
  };

  const plantillaProducto = (fila) => {
    return fila.producto ? <span className="text-gray-600 text-sm">{fila.producto.nombre}</span> : <span className="text-red-400 italic text-sm">Producto borrado</span>;
  };

  const plantillaComentario = (fila) => {
    return (
      <div className="max-w-xs truncate text-gray-600 text-sm" title={fila.comentario}>
        {fila.comentario || <span className="italic text-gray-400">Sin comentario escrito...</span>}
      </div>
    );
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
          <h1 className="text-2xl font-bold text-gray-800">Moderación de Reseñas</h1>
          <p className="text-gray-500 text-sm">Consulta, modera y gestiona las opiniones de los clientes sobre los productos.</p>
        </div>
        {/* Aquí NO hay botón de "Crear" porque el administrador no debe inventarse reviews */}
      </div>

      <DataTable 
        value={reviews} 
        paginator 
        rows={10} 
        first={firstRow} 
        onPage={(e) => setFirstRow(e.first)}
        dataKey="id" 
        emptyMessage="No hay reseñas publicadas en la tienda."
        className="shadow-sm rounded-lg overflow-hidden"
        pt={{
          headerCell: { className: 'py-4 px-6 bg-gray-50 text-gray-700 font-bold' },
          bodyRow: { className: 'hover:bg-gray-50 transition-colors border-b border-gray-100' },
          bodyCell: { className: 'py-5 px-6' } 
        }}
        loading={cargando}
      >
        <Column header="Cliente" body={plantillaUsuario} sortable sortField="user.nombre" />
        <Column header="Producto Valorado" body={plantillaProducto} sortable sortField="producto.nombre" />
        <Column header="Valoración" body={plantillaEstrellas} sortable sortField="valoracion" />
        <Column header="Comentario" body={plantillaComentario} />
        <Column body={plantillaAcciones} header="Acciones" exportable={false} style={{ width: '150px' }} />
      </DataTable>

      <Dialog 
        visible={modalVisible} 
        header="Editar o Moderar Reseña" 
        modal 
        className="p-fluid" 
        onHide={() => setModalVisible(false)}
        style={{ width: '500px', maxHeight: '80vh' }}
        contentStyle={{ overflowY: 'auto' }} 
      >
        <div className="space-y-5 px-4 pb-6 pt-2">
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4 text-sm text-gray-600">
            <p><strong>Cliente:</strong> {review.user?.nombre}</p>
            <p><strong>Producto:</strong> {review.producto?.nombre}</p>
          </div>

          <div className="field flex flex-col items-center py-2">
            <label className="font-bold text-gray-700 block mb-2">Valoración en Estrellas</label>
            <Rating value={review.valoracion} onChange={(e) => setReview({...review, valoracion: e.value})} cancel={false} className="gap-2" />
          </div>

          <div className="field">
            <label htmlFor="comentario" className="font-bold text-gray-700 block mb-1">Comentario escrito</label>
            <InputTextarea 
              id="comentario" 
              value={review.comentario || ''} 
              onChange={(e) => setReview({...review, comentario: e.target.value})} 
              rows={5} 
              autoResize 
              placeholder="Modifica o censura el comentario si incumple las normas..."
              className="w-full border border-gray-400 rounded-md p-2" 
            />
          </div>
          
        </div>

        <div className="flex justify-end gap-2 mt-4 px-4">
          <Boton variante="contorno" evento={() => setModalVisible(false)} className="py-2 px-4 mb-3 rounded">Cancelar</Boton>
          <Boton variante="primario" evento={guardar} className="py-2 px-4 rounded mb-3" disabled={cargando}>
            {cargando ? <i className="pi pi-spin pi-spinner mr-2"></i> : <i className="pi pi-check mr-2"></i>}
            Guardar Cambios
          </Boton>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminReviews;