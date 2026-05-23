import React from "react";
import { contextoProveedores } from "../componentes/context/ProveedorProveedores";

const useContextProveedores = () => {
  const contexto = useContext(contextoProveedores);

  if (!contexto) {
    throw new Error(
      "El contextoProveedores debe ser consumido en ProveedorProveedores",
    );
  }

  return contexto;
};

export default useContextProveedores;
