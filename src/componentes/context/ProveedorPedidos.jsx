import React, { createContext, useEffect, useState } from "react";
import useContextSesion from "../../hooks/useContextSesion";
import useAPI from "../../hooks/useAPI";

/* Proveedor que se encargará de proveer a los componentes que lo necesiten todo lo que tenga que ver con los pedidos,
he visto que también es necesario incluir al carrito de la compra, ya que tiene que ver mucho con la lógica de los pedidos. */

const contextoPedido = createContext();
const ProveedorPedidos = ({ children }) => {
  const {ponerMensaje, sesionIniciada, navegar} = useContextSesion();
  const {enviarDatos} = useAPI();

  /* Si el usuario previamente ha interactuado con el carrito, se cargan desde el localStorage,
       En caso de estar vacío, array vacío. */
  const carritoLocal = localStorage.getItem("carritoTetraBIOS-Local");
  const [carritoCompra, setCarritoCompra] = useState(
    carritoLocal ? JSON.parse(carritoLocal) : [],
  );

  // Cada vez que el estado del carrito cambie, se guarda en local.
  useEffect(() => {
    localStorage.setItem(
      "carritoTetraBIOS-Local",
      JSON.stringify(carritoCompra),
    );
  }, [carritoCompra]);

  // Si el usuario cierra sesión, vaciamos el carrito y el localStorage automáticamente para prevenir que otro usuario en el mismo pc sea un mirón.
  useEffect(() => {
    if (!sesionIniciada) {
      setCarritoCompra([]);
      localStorage.removeItem("carritoTetraBIOS-Local");
    }
  }, [sesionIniciada]);

  // Añadir productos al carrito local
  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarritoCompra((carritoActual) => {
      // Comprobamos si el producto ya está en el carrito
      const productoExistente = carritoActual.find(
        (item) => item.id === producto.id,
      );

      if (productoExistente) {
        // Si ya existe, creamos un nuevo carrito recorriendo el actual
        const nuevoCarrito = carritoActual.map((item) => {
          // Usamos un if/else tradicional para decidir qué hacer con cada línea
          if (item.id === producto.id) {
            // Es el que buscamos: le copiamos sus datos y le sumamos la cantidad nueva
            return { ...item, cantidad: item.cantidad + cantidad };
          } else {
            // Es otro producto distinto: lo devolvemos tal cual estaba
            return item;
          }
        });

        return nuevoCarrito;
      } else {
        // Si es un producto nuevo, lo añadimos al final del array
        return [...carritoActual, { ...producto, cantidad }];
      }
    });
    ponerMensaje("exito", "Añadido al Carrito Correctamente")
  };

  // Eliminar un producto entero del carrito local.
  const eliminarDelCarrito = (idProducto) => {
    // Se excluye del carrito el id del producto que el usuario seleccione.
    setCarritoCompra((carritoActual) => {
      return carritoActual.filter((producto) =>producto.id !== idProducto);
    });

    ponerMensaje("info", "Producto eliminado del carrito");
  };

  // Disminuir la cantidad puesta de un item del carrito en 1.
  const disminuirCantidad = (idProducto) => {
    setCarritoCompra((carritoActual) => {
      const producto = carritoActual.find((item) => item.id === idProducto);

      if (producto && producto.cantidad > 1) {
        // Si hay más de 1, simplemente se le resta 1 a la cantidad
        return carritoActual.map((item) => {
          if (item.id === idProducto) {
            return { ...item, cantidad: item.cantidad - 1 };
          }
          return item;
        });
      } else {
        // Si la cantidad es 1 (o menos), se devuelve el carrito intacto sin borrar nada.
        return carritoActual;
      }
    });
  };

  // Vaciar el contenido de todo el carrito
  const vaciarCarrito = () => {
    setCarritoCompra([]); 
    ponerMensaje("info", "Carrito Vaciado Correctamente");
  };

  const totalArticulos = carritoCompra.reduce((acumulador, item) => {
    return acumulador + item.cantidad;
  }, 0);

  // Calcula el precio total sumando (precio * cantidad) de cada producto
  const precioTotal = carritoCompra.reduce((acumulador, item) => {
    return acumulador + (parseFloat(item.precio) * item.cantidad);
  }, 0);

  
  // --- COMUNICACIÓN CON LARAVEL ---
  const tramitarPedido = async () => {
    
    // Antes de hacer nada, se verifica que el usuario esté logeado para hacer el pedido, por seguridad.
    if (!sesionIniciada) {
      ponerMensaje("error", "Debes iniciar sesión para tramitar tu pedido.");
      navegar("/login");
      return;
    }

    if (carritoCompra.length === 0) {
      ponerMensaje("error", "El carrito está vacío.");
      return;
    }

    // Se prepara el array con los datos para que coincida con lo que espera el StorePedidoRequest de Laravel.
    const cuerpoPeticion = {
      items: carritoCompra.map((item) => ({
        producto_id: item.id,
        cantidad: item.cantidad
      }))
    };

    try {
      await enviarDatos("pedidos", cuerpoPeticion);
      
      // Si todo va bien, limpiamos el  carrito local y se avisa al usuario
      setCarritoCompra([]); 
      ponerMensaje("success", "¡Pedido realizado con éxito!");
      
      navegar("/pedidos"); 
    } catch (error) {
      ponerMensaje("error", "Hubo un error al tramitar el pedido: " + error.message);
    }
  };

  const datos = {
    carritoCompra,
    agregarAlCarrito,
    eliminarDelCarrito,
    disminuirCantidad,
    vaciarCarrito,
    totalArticulos,
    precioTotal,
    tramitarPedido
  };
  return (
    <contextoPedido.Provider value={datos}>{children}</contextoPedido.Provider>
  );
};

export default ProveedorPedidos;
export { contextoPedido };
