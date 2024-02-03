import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as pedidosService from "../../../services/pedidos/pedidosService";
import {
  setPedidoStepAction,
  setStepPedidoComponentAction,
} from "../../../redux/slices/pedidoComponentSlice";

const TercerPasoPedido = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { step, pedidoData } = useSelector(
    (state) => state.pedidoComponentStore
  );
  const { nombres, apellidos, id } = pedidoData.cliente;
  const productos = pedidoData.productos;

  const formatoMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  });

  const dispatch = useDispatch();

  const handleNext = (step) => {
    dispatch(setStepPedidoComponentAction(step));
  };

  useEffect(() => {
    let suma = 0;
    productos.forEach((registro) => {
      suma += parseInt(registro.precio);
    });
    setTotal(suma);
  }, []);

  const handleCreatePedido = async () => {
    try {

      // creación del objeto para pedido
      const items = productos.map(item => ({
        productoId: item.id,
        precio: item.precio,
        cantidad: item.cantidad,
      }));

      const result = await pedidosService.PostPedido({pedidosItems: items, clienteId: id});
      console.log(result)
      dispatch(setPedidoStepAction({productos: [],cliente : null,}));
      dispatch(setStepPedidoComponentAction(1));
      //window.location.reload();
      navigate("/clientes");
    } catch (err) {
      console.log('error?')
      setErrorMessage(
        err.response?.data?.message ??
          err.message ??
          "Error desconocido, comuniquese con el administrador"
      );
    }
  };

  return (
    <>
      <br />
      <div className="row">
        <div className="col-lg-12">
          <h5>{`Paso ${step}: Confirmar la compra del cliente: ${nombres} ${apellidos}`}</h5>
          <br />

          <table className="table table-stripped ">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {productos.length > 0 &&
                productos.map((data) => (
                  <tr key={data.id}>
                    <td>{data.nombre}</td>
                    <td>{data.cantidad}</td>
                    <td>{formatoMoneda.format(data.precio)}</td>
                    <td>{formatoMoneda.format(data.precio * data.cantidad)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <h5>{`Total ${formatoMoneda.format(total)}`}</h5>
        <div className="col">
          <br />
          <button type="button" className="btn btn-success" onClick={() => handleCreatePedido()}>
            Enviar pedido
          </button>
        </div>
        <div className="col">
          <br />
          <button
            type="button"
            onClick={() => handleNext(2)}
            className="btn btn-light"
          >
            Volver
          </button>
        </div>
      </div>
      <br />
    </>
  );
};

export default TercerPasoPedido;
