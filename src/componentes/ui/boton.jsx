import React from 'react';

const Boton = ({ 
    children,               
    evento,                
    variante = 'primario',  
    tipo = 'button',        
    className = ''          
}) => {

    return (
        <button
            type={tipo}
            onClick={evento}
            // Para el estilo se llama a la clase base y a la clase de la variante (ej: "btn-base btn-primario") que están definidas en "index.css".
            className={`btn-base btn-${variante} ${className}`}
        >
            {children}
        </button>
    );
};

export default Boton;
