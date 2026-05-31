import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'; 
import { InputText } from 'primereact/inputtext';
import Boton from '../ui/boton';
import useAdminCRUD from '../../hooks/useAdminCRUD';

// Estado inicial vacío para resetear el formulario.
// Al ser una entidad que no depende de nadie, su estructura es mínima.
const categoriaVacia = {
  nombre: ''
};

const AdminCategoriasPadre = () => {
  // Deleto toda la lógica de estado (fetching, paginación, carga)
  // a mi hook genérico 'useAdminCRUD'. Solo tengo que pasarle el endpoint base 
  // ('categoria-padres') y él se encarga del resto.
  const { 
    datos: categorias, 
    cargando, 
    firstRow, 
    setFirstRow, 
    eliminarRegistro, 
    guardarRegistro 
  } = useAdminCRUD('categoria-padres'); 

  const toast = useRef(null);
  
  // Estados para controlar la visibilidad del modal y los datos en vivo del formulario.
  const [modalVisible, setModalVisible] = useState(false);
  const [categoria, setCategoria] = useState(categoriaVacia);
  const [esEdicion, setEsEdicion] = useState(false);

  // Helper para lanzar notificaciones visuales (Toast) sin repetir código.
  const mostrarMensaje = (severidad, texto) => {
    toast.current?.show({ severity: severidad, summary: severidad === 'error' ? 'Error' : 'Éxito', detail: texto, life: 3000 });
  };

  const abrirModalNuevo = () => {
    setCategoria(categoriaVacia);
    setEsEdicion(false);
    setModalVisible(true);
  };

  const abrirModalEdicion = (catData) => {
    // Uso el spread operator para clonar el objeto y evitar mutar el estado de la tabla directamente.
    setCategoria({ ...catData });
    setEsEdicion(true);
    setModalVisible(true);
  };

  const guardar = async () => {
    try {
      // El hook decide automáticamente si enviar un POST o un PUT basándose en si le paso un ID o null.
      await guardarRegistro(esEdicion ? categoria.id : null, categoria);
      mostrarMensaje('success', `Categoría ${esEdicion ? 'actualizada' : 'creada'} correctamente.`);
      setModalVisible(false);
    } catch (error) {
      mostrarMensaje('error', error.message || 'Ocurrió un error al guardar.');
    }
  };

  // El borrar una Categoría Padre es peligroso porque puede dejar subcategorías huérfanas o 
  // eliminar productos en cascada, por eso, exijo una confirmación explícita mediante un Dialog con estilo de advertencia (rojo).
  const confirmarEliminacionVisual = (id) => {
    confirmDialog({
      message: '¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer y puede afectar a las subcategorías vinculadas.',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle text-red-500',
      acceptClassName: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
      rejectClassName: 'p-button-text text-gray-600 font-bold py-2 px-4',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      style: { width: '400px' },
      accept: async () => {
        try {
          await eliminarRegistro(id);
          mostrarMensaje('success', 'Categoría eliminada con éxito.');
        } catch (error) {
          mostrarMensaje('error', 'No se pudo eliminar la categoría.');
        }
      }
    });
  };

  // Columna inyectada con los botones de acción para cada fila.
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
          <h1 className="text-2xl font-bold text-gray-800">Categorías Padre</h1>
          <p className="text-gray-500 text-sm">Gestiona las categorías principales (Top-Level) del catálogo.</p>
        </div>
        <Boton variante="primario" className="py-2 px-4 rounded-md shadow-sm" evento={abrirModalNuevo}>
          <i className="pi pi-plus mr-2"></i> Nueva Categoría
        </Boton>
      </div>

      <DataTable 
        value={categorias} 
        paginator 
        rows={10} 
        first={firstRow} 
        onPage={(e) => setFirstRow(e.first)}
        dataKey="id" 
        emptyMessage="No se encontraron categorías."
        className="shadow-sm rounded-lg overflow-hidden"
        // Utilizo el Pass-Through (pt) nativo de PrimeReact 
        // para dar más espacio interno (padding) a las celdas y mejorar la legibilidad.
        pt={{
          headerCell: { className: 'py-4 px-6 bg-gray-50 text-gray-700 font-bold' },
          bodyRow: { className: 'hover:bg-gray-50 transition-colors border-b border-gray-100' },
          bodyCell: { className: 'py-5 px-6 text-gray-600' } 
        }}
        loading={cargando}
      >
        <Column field="nombre" header="Nombre de la Categoría" sortable className="font-medium" />
        <Column body={plantillaAcciones} header="Acciones" exportable={false} style={{ width: '150px' }} />
      </DataTable>

      {/* Modal Reutilizable, sirve tanto para la acción de Crear como para la de Editar. */}
      <Dialog 
        visible={modalVisible} 
        header={esEdicion ? "Editar Categoría" : "Nueva Categoría"} 
        modal 
        className="p-fluid" 
        onHide={() => setModalVisible(false)}
        style={{ width: '400px' }}
      >
        <div className="px-4 py-4">
          <div className="field">
            <label htmlFor="nombre" className="font-bold text-gray-700 block mb-2">Nombre</label>
            <InputText id="nombre" value={categoria.nombre} onChange={(e) => setCategoria({...categoria, nombre: e.target.value})} required autoFocus className="w-full border border-gray-400 rounded-md p-2" />
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

export default AdminCategoriasPadre;