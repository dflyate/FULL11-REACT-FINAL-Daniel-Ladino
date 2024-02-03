import React, { useEffect, useState } from "react";
import * as clientesService from "../../services/clientes/clientesService";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ModalWithAction from "../../components/utils/modales/ModalWithAction";

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState([]);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const tooltipDelete = <Tooltip id="tooltip">Eliminar cliente</Tooltip>;
  const tooltipUpdate = <Tooltip id="tooltip">Editar cliente</Tooltip>;
  const tooltipShow = <Tooltip id="tooltip">Mostrar cliente</Tooltip>;
  const cerrarModalEliminar = () => setMostrarModalEliminar(false);
  const abrirModalEliminar = (data) => {
    setClienteSeleccionado(data);
    setMostrarModalEliminar(true);
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

  const handleDeleteCliente = async () => {
    try {
      const result = await clientesService.DeleteCliente(
        clienteSeleccionado.id
      );
      handleGetClientes();
      setMostrarModalEliminar(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <br />
      <div className="row">
        <h3>Lista de clientes</h3>
      </div>
      <br />
      <div className="row">
        <div className="col-lg-12">
          <Link className="btn btn-primary " to={"/clientes/nuevo"}>
            <FaPlus /> Crear Cliente
          </Link>
          <br />
          <br />
          <table className="table table-stripped ">
            <thead>
              <tr>
                <th>Id</th>
                <th>Tipo de Documento</th>
                <th>Número de documento</th>
                <th>Edad</th>
                <th>Nombre completo</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.length > 0 &&
                clientes.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.tipoDocumento}</td>
                    <td>{data.noDocumento}</td>
                    <td>{data.edad}</td>
                    <td>{data.nombres + " " + data.apellidos}</td>
                    <td>{data.correo}</td>
                    <td>{data.telefono}</td>
                    <td>
                      <div className="btn-group">
                        <OverlayTrigger
                          placement="bottom"
                          overlay={tooltipShow}
                        >
                          <Link
                            className="btn btn-warning rounded-circle "
                            to={"/clientes/ver/" + data.id}
                          >
                            <FaSearch />
                          </Link>
                        </OverlayTrigger>
                        &nbsp;
                        <OverlayTrigger
                          placement="bottom"
                          overlay={tooltipUpdate}
                        >
                          <Link
                            className="btn btn-success rounded-circle d-flex align-items-center"
                            to={"/clientes/editar/" + data.id}
                          >
                            <FaEdit />
                          </Link>
                        </OverlayTrigger>
                        &nbsp;
                        <OverlayTrigger
                          placement="bottom"
                          overlay={tooltipDelete}
                        >
                          <Link
                            className="btn btn-danger rounded-circle "
                            onClick={() => abrirModalEliminar(data)}
                          >
                            <FaTrash />
                          </Link>
                        </OverlayTrigger>
                      </div>
                      <ModalWithAction
                        mostrar={mostrarModalEliminar}
                        accion={handleDeleteCliente}
                        cerrarModal={cerrarModalEliminar}
                        titulo={"Eliminar Cliente"}
                        descripcion={`¿Está seguro de eliminar el cliente ${clienteSeleccionado.nombres + clienteSeleccionado.apellidos}?`}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientesPage;
