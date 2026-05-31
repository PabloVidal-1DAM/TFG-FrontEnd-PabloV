import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'; 
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import Boton from '../ui/boton';
import useAdminCRUD from '../../hooks/useAdminCRUD'; 

const usuarioVacio = {
  nombre: '',
  email: '',
  telefono: '',
  password: '',
  rol: 'usuario' // Asigno el rol de menor privilegio por defecto por seguridad.
};

// Roles físicos de la aplicación.
const rolesDisponibles = [
  { label: 'Administrador', value: 'admin' },
  { label: 'Usuario Estándar', value: 'usuario' }
];

const AdminUsuarios = () => {
  // Reutilizo mi hook genérico para la lógica CRUD. Apunto al endpoint 'users' de Laravel.
  const { 
    datos: usuarios, 
    cargando, 
    firstRow, 
    setFirstRow, 
    eliminarRegistro, 
    guardarRegistro 
  } = useAdminCRUD('users'); 

  const toast = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [usuario, setUsuario] = useState(usuarioVacio);
  const [esEdicion, setEsEdicion] = useState(false);

  // Centralizo las notificaciones Toast para no repetir la estructura en cada bloque try/catch
  const mostrarMensaje = (severidad, texto) => {
    toast.current?.show({ severity: severidad, summary: severidad === 'error' ? 'Error' : 'Éxito', detail: texto, life: 3000 });
  };

  const abrirModalNuevo = () => {
    setUsuario(usuarioVacio);
    setEsEdicion(false);
    setModalVisible(true);
  };

  const abrirModalEdicion = (userData) => {
    // Spatie Permission en Laravel devuelve los roles dentro de un array.
    // Extraigo el primer rol de forma segura, o aplico 'usuario' como fallback si algo falla.
    const rolActual = userData.roles && userData.roles.length > 0 ? userData.roles[0].name : 'usuario';
    
    setUsuario({ 
      ...userData, 
      // Por seguridad, NUNCA expongo la contraseña real en el front. La dejo vacía 
      // y si el admin la rellena, Laravel entenderá que quiere sobreescribirla.
      password: '', 
      rol: rolActual 
    });
    setEsEdicion(true);
    setModalVisible(true);
  };

  const guardar = async () => {
    try {
      // Seguridad en Front-End: Si es un usuario nuevo, la contraseña es obligatoria.
      // Así evitamos llamadas fallidas innecesarias al backend.
      if (!esEdicion && (!usuario.password || usuario.password.length < 6)) {
        throw new Error("La contraseña es obligatoria y debe tener al menos 6 caracteres.");
      }

      await guardarRegistro(esEdicion ? usuario.id : null, usuario);
      mostrarMensaje('success', `Usuario ${esEdicion ? 'actualizado' : 'creado'} correctamente.`);
      setModalVisible(false);
    } catch (error) {
      mostrarMensaje('error', error.message || 'Ocurrió un error al guardar el usuario.');
    }
  };

  const confirmarEliminacionVisual = (id) => {
    confirmDialog({
      message: '¿Estás seguro de que deseas eliminar este usuario? Perderá el acceso al sistema.',
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
          mostrarMensaje('success', 'Usuario eliminado con éxito.');
        } catch (error) {
          mostrarMensaje('error', 'No se pudo eliminar el usuario.');
        }
      }
    });
  };

  // --- PLANTILLAS VISUALES ---
  
  // Utilizo una plantilla visual para destacar rápidamente a los administradores
  // en la tabla usando un sistema de badges de colores.
  const plantillaRol = (fila) => {
    const esAdmin = fila.roles?.some(r => r.name === 'admin');
    return esAdmin ? (
      <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-purple-200">
        Administrador
      </span>
    ) : (
      <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-gray-200">
        Usuario
      </span>
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
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h1>
          <p className="text-gray-500 text-sm">Administra los clientes y asigna permisos de administrador.</p>
        </div>
        <Boton variante="primario" className="py-2 px-4 rounded-md shadow-sm" evento={abrirModalNuevo}>
          <i className="pi pi-plus mr-2"></i> Nuevo Usuario
        </Boton>
      </div>

      <DataTable 
        value={usuarios} 
        paginator 
        rows={10} 
        first={firstRow} 
        onPage={(e) => setFirstRow(e.first)}
        dataKey="id" 
        emptyMessage="No se encontraron usuarios."
        className="shadow-sm rounded-lg overflow-hidden"
        pt={{
          headerCell: { className: 'py-4 px-6 bg-gray-50 text-gray-700 font-bold' },
          bodyRow: { className: 'hover:bg-gray-50 transition-colors border-b border-gray-100' },
          bodyCell: { className: 'py-5 px-6 text-gray-600' } 
        }}
        loading={cargando}
      >
        <Column field="nombre" header="Nombre" sortable className="font-medium" />
        <Column field="email" header="Email" sortable />
        <Column field="telefono" header="Teléfono" sortable />
        {/* Ordeno por el primer rol asignado (Spatie) */}
        <Column body={plantillaRol} header="Rol" sortable sortField="roles[0].name" />
        <Column body={plantillaAcciones} header="Acciones" exportable={false} style={{ minWidth: '100px' }} />
      </DataTable>

      <Dialog 
        visible={modalVisible} 
        header={esEdicion ? "Editar Usuario" : "Nuevo Usuario"} 
        modal 
        className="p-fluid" 
        onHide={() => setModalVisible(false)}
        style={{ width: '500px', maxHeight: '80vh' }}
        contentStyle={{ overflowY: 'auto' }} 
      >
        <div className="space-y-5 px-4 pb-6 pt-2">
          
          <div className="field">
            <label htmlFor="rol" className="font-bold text-gray-700 block mb-1">Rol del Sistema</label>
            <Dropdown id="rol" value={usuario.rol} onChange={(e) => setUsuario({...usuario, rol: e.value})} options={rolesDisponibles} placeholder="Selecciona un rol" className="w-full border border-gray-400 rounded-md" />
          </div>

          <div className="field">
            <label htmlFor="nombre" className="font-bold text-gray-700 block mb-1">Nombre Completo</label>
            <InputText id="nombre" value={usuario.nombre} onChange={(e) => setUsuario({...usuario, nombre: e.target.value})} required autoFocus className="w-full border border-gray-400 rounded-md p-2" />
          </div>

          <div className="flex gap-4">
            <div className="field flex-1">
              <label htmlFor="email" className="font-bold text-gray-700 block mb-1">Email</label>
              <InputText id="email" type="email" value={usuario.email} onChange={(e) => setUsuario({...usuario, email: e.target.value})} required className="w-full border border-gray-400 rounded-md p-2" />
            </div>
            <div className="field flex-1">
              <label htmlFor="telefono" className="font-bold text-gray-700 block mb-1">Teléfono</label>
              <InputText id="telefono" value={usuario.telefono || ''} onChange={(e) => setUsuario({...usuario, telefono: e.target.value})} className="w-full border border-gray-400 rounded-md p-2" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="password" className="font-bold text-gray-700 block mb-1">
              Contraseña {esEdicion && <span className="text-gray-400 font-normal text-sm">(Dejar en blanco para mantener la actual)</span>}
            </label>
            {/* He desactivado el feedback de seguridad del componente Password de PrimeReact:
                (barras de colores) para mantener el formulario más limpio, ya que el admin se supone que sabe formar una buena contraaseña, y si no, el backend avisará. */}
            <Password 
              id="password" 
              value={usuario.password} 
              onChange={(e) => setUsuario({...usuario, password: e.target.value})} 
              toggleMask 
              feedback={false}
              inputClassName="w-full border border-gray-400 rounded-md p-2" 
            />
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

export default AdminUsuarios;