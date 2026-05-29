import React from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../ui/boton';

const NoEncontrado = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      {/* Contenedor del 404 gigante con un "badge" rotado */}
      <div className="relative">
        <h1 className="text-9xl font-extrabold text-green-800 tracking-widest opacity-20">404</h1>
        <div className="bg-primario px-3 py-1 text-sm font-bold rounded-md rotate-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white shadow-lg whitespace-nowrap">
          Página no encontrada
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mt-8">¡Ups! Nos hemos salido del mapa.</h2>
      
      <p className="text-gray-500 max-w-lg mx-auto text-lg">
        Parece que la página que buscas ha sido reciclada o directamente nunca existió en nuestro catálogo. 
      </p>
      
      <div className="pt-8">
        <Boton
          variante="primario"
          className="py-3 px-8 text-lg rounded-full shadow-md hover:scale-105 transition-transform"
          evento={() => navigate('/')}
        >
          <i className="pi pi-home mr-2"></i> Volver a la página principal
        </Boton>
      </div>
    </div>
  );
};

export default NoEncontrado;