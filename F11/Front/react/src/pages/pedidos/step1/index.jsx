import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setPedidoStepAction,
  setStepPedidoComponentAction,
} from "../../../redux/slices/pedidoComponentSlice";
import { useSelector } from 'react-redux';
import * as clientesService from "../../../services/clientes/clientesService";

const PrimerPasoPedido = () => {
    const {step} = useSelector(state => state.pedidoComponentStore)
  const [clientes, setClientes] = useState([]);

  const dispatch = useDispatch();

  const handleNext = (step) => {
    dispatch(setStepPedidoComponentAction(step));
  };

  useEffect(() => {
    handleGetClientes();
  }, []);

  const handleGetClientes = async () => {
    try {
      const result = await clientesService.GetClientes();
      setClientes(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCliente = (e) => {
    const payload = {
      cliente: clientes.find((cliente) => cliente.id === e.target.value),
    };
    dispatch(setPedidoStepAction(payload));
  };

  return (
    <>
      <br />
      <div className="row">
        <div className="col-lg-12">
          <h5>{`Paso ${step}: Seleccione un cliente`}</h5>
          <br />
          <form>
            <div className="row">
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Clientes</label>
                <br />
                <br />
                <select
                  className="form-select"
                  aria-label="Clientes"
                  onChange={(e) => handleChangeCliente(e)}
                >
                  <option selected defaultValue="NA">
                    --Seleccione--
                  </option>

                  {clientes.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.nombres + " " + data.apellidos}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
          <div className="col">
            <br/>
            <button
              type="button"
              onClick={() => handleNext(2)}
              className="btn btn-success"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
      </>
  );
};

export default PrimerPasoPedido;
