import React, { useEffect, useState } from "react";
import * as usuariosService from "../../services/usuarios/usuariosService";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ModalWithAction from "../../components/utils/modales/ModalWithAction";

const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState([]);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const tooltipDelete = <Tooltip id="tooltip">Eliminar usuario</Tooltip>;
  const tooltipUpdate = <Tooltip id="tooltip">Editar usuario</Tooltip>;
  const tooltipShow = <Tooltip id="tooltip">Mostrar usuario</Tooltip>;
  const cerrarModalEliminar = () => setMostrarModalEliminar(false);
  const abrirModalEliminar = (data) => {
    setUsuarioSeleccionado(data);
    setMostrarModalEliminar(true);
  };
  useEffect(() => {
    handleGetUsuarios();
  }, []);

  const handleGetUsuarios = async () => {
    try {
      const result = await usuariosService.GetUsuarios();
      setUsuarios(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUsuario = async () => {
    try {
      const result = await usuariosService.DeleteUsuario(
        usuarioSeleccionado.id
      );
      handleGetUsuarios();
      setMostrarModalEliminar(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <br />
      <div className="row">
        <h3>Lista de usuarios</h3>
      </div>
      <br />
      <div className="row">
        <div className="col-lg-12">
          <Link className="btn btn-primary " to={"/usuarios/nuevo"}>
            <FaPlus /> Crear Usuario
          </Link>
          <br />
          <br />
          <table className="table table-stripped ">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre completo</th>
                <th>Correo</th>
                <th>Role</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 &&
                usuarios.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.nombres + " " + data.apellidos}</td>
                    <td>{data.correo}</td>
                    <td>{data.role}</td>
                    <td>
                      <div className="btn-group">
                        <OverlayTrigger
                          placement="bottom"
                          overlay={tooltipShow}
                        >
                          <Link
                            className="btn btn-warning rounded-circle "
                            to={"/usuarios/ver/" + data.id}
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
                            to={"/usuarios/editar/" + data.id}
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
                        accion={handleDeleteUsuario}
                        cerrarModal={cerrarModalEliminar}
                        titulo={"Eliminar Usuario"}
                        descripcion={`¿Está seguro de eliminar el usuario ${
                          usuarioSeleccionado.nombres + " " +
                          usuarioSeleccionado.apellidos
                        }?`}
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

export default UsuariosPage;
