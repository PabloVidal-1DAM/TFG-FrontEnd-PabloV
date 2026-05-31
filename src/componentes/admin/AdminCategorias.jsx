import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'; 
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import Boton from '../ui/boton';
import useAdminCRUD from '../../hooks/useAdminCRUD'; 
import useAPI from '../../hooks/useAPI'; 

// Estado base para limpiar el formulario cuando se crea una nueva subcategoría.
const categoriaVacia = {
  nombre: '',
  descripcion: '',
  categoria_padre_id: null
};

const AdminCategorias = () => {
  // Uso mi hook genérico 'useAdminCRUD' exclusivamente para gestionar el ciclo de vida 
  // de la entidad principal de esta vista (las categorías normales).
  const { 
    datos: categorias, 
    cargando: cargandoCategorias, 
    firstRow, 
    setFirstRow, 
    eliminarRegistro, 
    guardarRegistro 
  } = useAdminCRUD('categorias'); 

  // Extraigo 'obtenerDatos' de mi hook base 'useAPI' para hacer una petición secundaria.
  // ¿Y porque?: No metí esta petición dentro de 'useAdminCRUD' para mantenerlo 
  // completamente agnóstico y reutilizable. Combino ambos hooks aquí en la vista.
  const { obtenerDatos } = useAPI();
  const [categoriasPadre, setCategoriasPadre] = useState([]);

  const toast = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoria, setCategoria] = useState(categoriaVacia);
  const [esEdicion, setEsEdicion] = useState(false);

  // Uso un useEffect para cargar la lista de categorías padre solo una vez cuando el componente se monta en el DOM.
  // Así evito peticiones redundantes al servidor en cada renderizado.
  useEffect(() => {
    const cargarPadres = async () => {
      try {
        // Pido 1000 registros para asegurarme de que el Dropdown muestre todas las opciones disponibles.
        const respuesta = await obtenerDatos('categoria-padres?per_page=1000');
        setCategoriasPadre(respuesta.data || respuesta);
      } catch (error) {
        console.error("Error al cargar categorías padre", error);
      }
    };
    cargarPadres();
  }, []);

  const mostrarMensaje = (severidad, texto) => {
    toast.current?.show({ severity: severidad, summary: severidad === 'error' ? 'Error' : 'Éxito', detail: texto, life: 3000 });
  };

  const abrirModalNuevo = () => {
    setCategoria(categoriaVacia);
    setEsEdicion(false);
    setModalVisible(true);
  };

  const abrirModalEdicion = (catData) => {
    setCategoria({ ...catData });
    setEsEdicion(true);
    setModalVisible(true);
  };

  const guardar = async () => {
    try {
      await guardarRegistro(esEdicion ? categoria.id : null, categoria);
      mostrarMensaje('success', `Categoría ${esEdicion ? 'actualizada' : 'creada'} correctamente.`);
      setModalVisible(false);
    } catch (error) {
      mostrarMensaje('error', error.message || 'Ocurrió un error al guardar.');
    }
  };

  const confirmarEliminacionVisual = (id) => {
    confirmDialog({
      message: '¿Estás seguro de que deseas eliminar esta subcategoría? Esta acción no se puede deshacer.',
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
          mostrarMensaje('success', 'Categoría eliminada con éxito.');
        } catch (error) {
          mostrarMensaje('error', 'No se pudo eliminar la categoría.');
        }
      }
    });
  };

  // --- PLANTILLAS VISUALES ---
  // Facilito la lectura de la tabla añadiendo un badge visual si la categoría 
  // pertenece a un Padre, o un texto gris en cursiva si es una categoría huérfana.
  const plantillaPadre = (fila) => {
    return fila.categoria_padre ? (
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-200">
        {fila.categoria_padre.nombre}
      </span>
    ) : (
      <span className="text-gray-400 italic text-sm">Sin padre</span>
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
          <h1 className="text-2xl font-bold text-gray-800">Subcategorías</h1>
          <p className="text-gray-500 text-sm">Organiza las categorías dependientes y sus descripciones.</p>
        </div>
        <Boton variante="primario" className="py-2 px-4 rounded-md shadow-sm" evento={abrirModalNuevo}>
          <i className="pi pi-plus mr-2"></i> Nueva Subcategoría
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
        pt={{
          headerCell: { className: 'py-4 px-6 bg-gray-50 text-gray-700 font-bold' },
          bodyRow: { className: 'hover:bg-gray-50 transition-colors border-b border-gray-100' },
          bodyCell: { className: 'py-5 px-6 text-gray-600' } 
        }}
        loading={cargandoCategorias}
      >
        <Column field="nombre" header="Nombre" sortable className="font-medium" />
        {/* Indico sortField="categoria_padre.nombre" para que PrimeReact sepa ordenar por 
            la propiedad anidada del objeto en lugar del objeto en sí. */}
        <Column body={plantillaPadre} header="Categoría Principal" sortable sortField="categoria_padre.nombre" />
        <Column field="descripcion" header="Descripción" />
        <Column body={plantillaAcciones} header="Acciones" exportable={false} style={{ width: '150px' }} />
      </DataTable>

      <Dialog 
        visible={modalVisible} 
        header={esEdicion ? "Editar Subcategoría" : "Nueva Subcategoría"} 
        modal 
        className="p-fluid" 
        onHide={() => setModalVisible(false)}
        style={{ width: '500px', maxHeight: '80vh' }}
        contentStyle={{ overflowY: 'auto' }} 
      >
        <div className="space-y-5 px-4 pb-6 pt-2">
          
          <div className="field">
            <label htmlFor="categoria_padre" className="font-bold text-gray-700 block mb-1">Categoría Principal (Padre)</label>
            {/* Vinculo el Dropdown al estado 'categoriasPadre' que cargué en el useEffect. */}
            <Dropdown 
              id="categoria_padre" 
              value={categoria.categoria_padre_id} 
              onChange={(e) => setCategoria({...categoria, categoria_padre_id: e.value})} 
              options={categoriasPadre} 
              optionLabel="nombre" 
              optionValue="id" 
              placeholder="Selecciona la categoría superior" 
              className="w-full border border-gray-400 rounded-md" 
            />
          </div>

          <div className="field">
            <label htmlFor="nombre" className="font-bold text-gray-700 block mb-1">Nombre</label>
            <InputText 
              id="nombre" 
              value={categoria.nombre} 
              onChange={(e) => setCategoria({...categoria, nombre: e.target.value})} 
              required 
              autoFocus 
              className="w-full border border-gray-400 rounded-md p-2" 
            />
          </div>

          <div className="field">
            <label htmlFor="descripcion" className="font-bold text-gray-700 block mb-1">Descripción</label>
            {/* Fallback de seguridad (|| ''): Si la descripción es null, React no lanzará un warning 
                sobre un componente cambiando de uncontrolled a controlled. */}
            <InputTextarea 
              id="descripcion" 
              value={categoria.descripcion || ''} 
              onChange={(e) => setCategoria({...categoria, descripcion: e.target.value})} 
              rows={4} 
              autoResize 
              className="w-full border border-gray-400 rounded-md p-2" 
            />
          </div>
          
        </div>

        <div className="flex justify-end gap-2 mt-4 px-4">
          <Boton variante="contorno" evento={() => setModalVisible(false)} className="py-2 px-4 mb-3 rounded">Cancelar</Boton>
          <Boton variante="primario" evento={guardar} className="py-2 px-4 rounded mb-3" disabled={cargandoCategorias}>
            {cargandoCategorias ? <i className="pi pi-spin pi-spinner mr-2"></i> : <i className="pi pi-check mr-2"></i>}
            Guardar
          </Boton>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminCategorias;