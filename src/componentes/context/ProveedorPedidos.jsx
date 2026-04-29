import React, { createContext, useEffect, useState } from "react";
import useContextSesion from "../../hooks/useContextSesion";

/* Proveedor que se encargará de proveer a los componentes que lo necesiten todo lo que tenga que ver con los pedidos,
he visto que también es necesario incluir al carrito de la compra, ya que tiene que ver mucho con la lógica de los pedidos. */

const contextoPedido = createContext();
const ProveedorPedidos = ({ children }) => {
  const {ponerMensaje} = useContextSesion();

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

  const datos = {
    carritoCompra,
    agregarAlCarrito,
    eliminarDelCarrito,
    disminuirCantidad,
    vaciarCarrito,
    totalArticulos,
    precioTotal
  };
  return (
    <contextoPedido.Provider value={datos}>{children}</contextoPedido.Provider>
  );
};

export default ProveedorPedidos;
export { contextoPedido };
