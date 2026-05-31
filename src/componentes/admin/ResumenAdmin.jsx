import React, { useEffect, useState } from 'react';
import useAPI from '../../hooks/useAPI';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Chart } from 'primereact/chart'; 
import { useNavigate } from 'react-router-dom'; 
import Boton from '../ui/boton';
import { formatearMoneda } from '../../functions/formatos'; 

const ResumenAdmin = () => {
  const { obtenerDatos } = useAPI();
  const navigate = useNavigate(); 

  const [resumen, setResumen] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  const [datosGrafico, setDatosGrafico] = useState({});
  const [opcionesGrafico, setOpcionesGrafico] = useState({});

  useEffect(() => {
    const cargarResumen = async () => {
      try {
        setCargando(true);
        const data = await obtenerDatos('admin/resumen');
        setResumen(data);

        if (data.grafico_pedidos) {
          const documentStyle = getComputedStyle(document.documentElement);
          
          setDatosGrafico({
            labels: ['Pendientes', 'Enviados', 'Entregados'],
            datasets: [
              {
                data: [
                  data.grafico_pedidos.pendiente, 
                  data.grafico_pedidos.enviado, 
                  data.grafico_pedidos.entregado
                ],
                backgroundColor: [
                  documentStyle.getPropertyValue('--yellow-400') || '#facc15',
                  documentStyle.getPropertyValue('--blue-400') || '#60a5fa',
                  documentStyle.getPropertyValue('--green-400') || '#4ade80'
                ],
                hoverBackgroundColor: [
                  documentStyle.getPropertyValue('--yellow-500') || '#eab308',
                  documentStyle.getPropertyValue('--blue-500') || '#3b82f6',
                  documentStyle.getPropertyValue('--green-500') || '#22c55e'
                ]
              }
            ]
          });

          setOpcionesGrafico({
            plugins: {
              legend: { labels: { usePointStyle: true } }
            },
            cutout: '60%' 
          });
        }
      } catch (err) {
        setError('No se pudieron cargar las estadísticas del servidor.');
      } finally {
        setCargando(false);
      }
    };

    cargarResumen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (cargando) {
    return (
      <div className="flex justify-center items-center h-64">
        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
        <i className="pi pi-exclamation-triangle mr-2"></i> {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Panel de Control</h1>
          <p className="text-gray-500 text-sm">Resumen general del rendimiento de TetraBIOS.</p>
        </div>
      </div>

      {/* Grid de KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-green-100 p-4 rounded-lg text-green-600">
            <i className="pi pi-euro text-2xl"></i>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Ingresos Totales</p>
            <p className="text-2xl font-extrabold text-gray-900">{formatearMoneda(resumen?.ingresos_totales)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-blue-100 p-4 rounded-lg text-blue-600">
            <i className="pi pi-shopping-bag text-2xl"></i>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Ventas Realizadas</p>
            <p className="text-2xl font-extrabold text-gray-900">{resumen?.total_pedidos}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-purple-100 p-4 rounded-lg text-purple-600">
            <i className="pi pi-chart-line text-2xl"></i>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Ticket Medio</p>
            <p className="text-2xl font-extrabold text-gray-900">{formatearMoneda(resumen?.ticket_medio)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-orange-100 p-4 rounded-lg text-orange-600">
            <i className="pi pi-users text-2xl"></i>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Clientes Registrados</p>
            <p className="text-2xl font-extrabold text-gray-900">{resumen?.total_usuarios}</p>
          </div>
        </div>
      </div>

      {/* Gráfico y Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Gráfico Visual (Ocupa 1 columna) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-1 flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold text-gray-800 mb-4 w-full text-left">Estado de los Pedidos</h2>
          {resumen?.total_pedidos > 0 ? (
            <div className="w-full flex justify-center">
              <Chart type="doughnut" data={datosGrafico} options={opcionesGrafico} className="w-full md:w-3/4 lg:w-full" />
            </div>
          ) : (
             <p className="text-gray-500 italic py-10">No hay datos suficientes para el gráfico.</p>
          )}
        </div>

        {/* Alertas (Ocupa 2 columnas) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="pi pi-bell text-yellow-500"></i> Atención Requerida
            </h2>
            {resumen?.pedidos_pendientes > 0 ? (
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <div>
                  <p className="font-bold text-yellow-800">Tienes {resumen.pedidos_pendientes} pedidos pendientes.</p>
                  <p className="text-sm text-yellow-700">Revisa la pestaña de Pedidos para gestionar los envíos.</p>
                </div>
                {/* Botón para ver los pedidos en estado pendiente a su ventana de administración. */}
                <Boton 
                  variante="contorno" 
                  evento={() => navigate('/admin/pedidos')} 
                  className="bg-white text-yellow-700 border-yellow-300 hover:cursor-pointer"
                >
                  Gestionar
                </Boton>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
                <i className="pi pi-check-circle text-2xl mb-2 text-gray-400"></i>
                <p>No tienes pedidos pendientes de envío.</p>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="pi pi-box text-red-500"></i> Estado del Almacén
            </h2>
            {resumen?.productos_bajo_stock > 0 ? (
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                <div>
                  <p className="font-bold text-red-800">{resumen.productos_bajo_stock} productos se están agotando.</p>
                  <p className="text-sm text-red-700">Tienen menos de 20 unidades en stock.</p>
                </div>
                {/* Botón para ver los productos con menos de 20 de stock a su ventana de administración. */}
                <Boton 
                  variante="contorno" 
                  evento={() => navigate('/admin/productos')} 
                  className="bg-white text-red-700 border-red-300 hover:cursor-pointer"
                >
                  Revisar Stock
                </Boton>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
                <i className="pi pi-check-circle text-2xl mb-2 text-gray-400"></i>
                <p>Tu catálogo tiene stock saludable.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResumenAdmin;