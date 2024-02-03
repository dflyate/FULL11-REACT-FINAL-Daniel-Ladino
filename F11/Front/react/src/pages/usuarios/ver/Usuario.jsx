import React, { useEffect, useState } from "react";
import * as usuariosService from "../../../services/usuarios/usuariosService";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import ModalWithAction from "../../../components/utils/modales/ModalWithAction";

export const UsuarioPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [usuarioData, setUsuarioData] = useState(null);
  const [edicion, setEdicion] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const cerrarModalEliminar = () => setMostrarModalEliminar(false);

  useEffect(() => {
    if (id !== undefined || usuarioData !== null) getUsuarioById();
    else setUsuarioData({ nombres: null, apellidos: null, correo: null, clave: null, role: null });
  }, []);

  const getUsuarioById = async () => {
    try {
      const result = await usuariosService.GetUsuarioById(id);
      setEdicion(location.pathname.includes("/editar"));
      setUsuarioData(result);
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message ??
          err.message ??
          "Error desconocido, comuniquese con el administrador"
      );
      setMostrarModalEliminar(true);
    }
  };

  const handleUpdateUsuario = async () => {
    try {
      if (usuarioData.id !== undefined) {
        const result = await usuariosService.PutUsuario(usuarioData.id, {
            nombres: usuarioData.nombres, 
            apellidos: usuarioData.apellidos, 
            correo: usuarioData.correo, 
            clave: usuarioData.clave, 
            role: usuarioData.role, 
        });
      } else {
        const result = await usuariosService.PostUsuario(usuarioData);
      }

      navigate("/usuarios");
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message ??
          err.message ??
          "Error desconocido, comuniquese con el administrador"
      );
      setMostrarModalEliminar(true);
    }
  };

  const handleReturn = () => {
    navigate("/usuarios");
  };

  const handleUsuarioDataChange = (e) => {
    const { name, value } = e.target;
    setUsuarioData((prevUsuarioState) => ({
      ...prevUsuarioState,
      [name]: value,
    }));
  };

  return (
    <>
      {usuarioData && (
        <div className="container">
          <br />
          <div className="row">
            <h3>
              {usuarioData.id !== undefined
                ? edicion
                  ? "Editar Usuario"
                  : "Ver Usuario"
                : "Crear Usuario"}
            </h3>
          </div>
          <br />
          <form>
            <div className="row">
              {usuarioData.id !== undefined ? (
                <div className="col">
                  <label style={{ fontWeight: "bold" }}>ID</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled="true"
                    name="id"
                    value={usuarioData.id}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <br />
            <div className="row">
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Nombres</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombres"
                  disabled={
                    usuarioData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleUsuarioDataChange}
                  value={usuarioData.nombres}
                />
              </div>
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  name="apellidos"
                  disabled={
                    usuarioData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleUsuarioDataChange}
                  value={usuarioData.apellidos}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Correo</label>
                <input
                  type="text"
                  className="form-control"
                  name="correo"
                  disabled={
                    usuarioData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleUsuarioDataChange}
                  value={usuarioData.correo}
                />
              </div>
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Clave</label>
                <input
                  type="text"
                  className="form-control"
                  name="clave"
                  disabled={
                    usuarioData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleUsuarioDataChange}
                  value={usuarioData.clave}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Role</label>
                <input
                  type="text"
                  className="form-control"
                  name="role"
                  disabled={
                    usuarioData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleUsuarioDataChange}
                  value={usuarioData.role}
                />
              </div>
            </div>

            <br />
            {usuarioData.id !== undefined ? (
              <div className="row">
                <div className="col">
                  <label style={{ fontWeight: "bold" }}>
                    Fecha de creación
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    disabled="true"
                    name="creacion"
                    value={
                        usuarioData.fechaCreacion
                        ? format(
                            usuarioData.fechaCreacion,
                            "dd-MM-yyyy HH:mm"
                          )
                        : usuarioData.fechaCreacion
                    }
                  />
                </div>
                <div className="col">
                  <label style={{ fontWeight: "bold" }}>
                    Fecha de Actualización
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    disabled="true"
                    name="actualizacion"
                    value={
                        usuarioData.fechaActualizacion
                        ? format(
                            usuarioData.fechaActualizacion,
                            "dd-MM-yyyy HH:mm"
                          )
                        : usuarioData.fechaActualizacion
                    }
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </form>
          <br />
          <div className="col">
            {usuarioData.id === undefined || (edicion != null && edicion) ? (
              <button
                type="button"
                onClick={() => handleUpdateUsuario()}
                className="btn btn-success"
              >
                {usuarioData.id !== undefined ? "Editar" : "Crear"}
              </button>
            ) : (
              ""
            )}
            &nbsp;
            <button
              type="button"
              onClick={() => handleReturn()}
              className="btn btn-light"
            >
              Regresar
            </button>
          </div>
        </div>
      )}
      <ModalWithAction
        mostrar={mostrarModalEliminar}
        cerrarModal={cerrarModalEliminar}
        titulo={"Error"}
        descripcion={errorMessage}
      />
    </>
  );
};

export default UsuarioPage;
