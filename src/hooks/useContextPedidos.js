import React, { useContext } from "react";
import { contextoPedido } from "../componentes/context/ProveedorPedidos";

const useContextPedidos = () => {
  const contexto = useContext(contextoPedido);

  if (!contexto) {
    throw new Error(
      "El hook useContextPedidos debe usarse en ProveedorPedidos",
    );
  }
  return contexto;
};

export default useContextPedidos;
