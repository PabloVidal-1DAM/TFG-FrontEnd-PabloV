import React from 'react';
import { Card } from 'primereact/card';
import Boton from '../ui/boton';
import {formatearMoneda} from '../functions/formatos'

const Producto = ({ producto }) => {
    
    const urlImagen = `http://localhost:8095/storage/${producto.imagen_url}`;

    const cabecera = (
        <img 
            alt={producto.nombre} 
            src={urlImagen} 
            onError={(e) => {
                e.target.src = 'https://i.pinimg.com/736x/1d/ee/d3/1deed3023b8133467193027146da7b83.jpg';
            }}
            className="h-48 w-full object-contain bg-gray-50 rounded-t-lg" 
        />
    );

    const pie = (
        <div className="flex justify-between items-center mt-2">
            <span className="text-xl font-bold text-primario">{formatearMoneda(producto.precio)}</span>
            <Boton variante="primario" className="py-2 px-4 text-sm mr-5">
                <i className="pi pi-shopping-cart mr-2"></i> Añadir
            </Boton>
        </div>
    );

    return (
        <Card 
            title={producto.nombre} 
            header={cabecera} 
            footer={pie} 
            className="h-full w-full flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            pt={{ body: { className: 'p-4' }, content: { className: 'py-2' } }}
        >
            <p className="m-0 text-gray-600 line-clamp-2 text-sm mb-4">
                {producto.descripcion}
            </p>
            
            <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-2 border-gray-100">
                <span>📦 Stock: {producto.stock} unidades.</span>
                
                {producto.categorias && producto.categorias.length > 0 && (
                    <span className="bg-secundario text-terciario px-2 py-1 rounded-full font-semibold">
                        {producto.categorias[0].nombre}
                    </span>
                )}
            </div>
        </Card>
    );
};

export default Producto;