import React from "react";
import { useSelector } from "react-redux";
import PrimerPasoPedido from "./step1";
import SegundoPasoPedido from "./step2";
import TercerPasoPedido from "./step3";

const PedidosPage = () => {
  const { step } = useSelector((state) => state.pedidoComponentStore);
  return (
    <div className="container">
      <br/>
        <h3>Creación del pedido</h3>
      {step == 1 && <PrimerPasoPedido />}
      {step == 2 && <SegundoPasoPedido />}
      {step == 3 && <TercerPasoPedido />}
    </div>
  );
};

export default PedidosPage;
