import React, { useEffect, useState } from "react";
import * as clientesService from "../../../services/clientes/clientesService";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import ModalWithAction from "../../../components/utils/modales/ModalWithAction";

export const ClientePage = () => { 
  const navigate = useNavigate();
  const { id } = useParams();

  const [clienteData, setClienteData] = useState(null);
  const [edicion, setEdicion] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const cerrarModalEliminar = () => setMostrarModalEliminar(false);

  useEffect(() => {
    if (id !== undefined || clienteData !== null) getClienteById();
    else setClienteData({ tipoDocumento : null, noDocumento: null, edad: null, nombres: null, apellidos: null, correo: null, telefono: null, direccion: null, ciudad: null, notas: null });
  }, []);

  const getClienteById = async () => {
    try {
      const result = await clientesService.GetClienteById(id);
      setEdicion(location.pathname.includes("/editar"));
      setClienteData(result);
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message ??
          err.message ??
          "Error desconocido, comuniquese con el administrador"
      );
      setMostrarModalEliminar(true);
    }
  };

  const handleUpdateCliente = async () => {
    try {
      if (clienteData.id !== undefined) {
        const result = await clientesService.PutCliente(clienteData.id, {
            tipoDocumento : clienteData.tipoDocumento, 
            noDocumento: clienteData.noDocumento, 
            edad: clienteData.edad, 
            nombres: clienteData.nombres, 
            apellidos: clienteData.apellidos, 
            correo: clienteData.correo, 
            telefono: clienteData.telefono, 
            direccion: clienteData.direccion, 
            ciudad: clienteData.ciudad,
            notas: clienteData.notas
        });
      } else {
        const result = await clientesService.PostCliente(clienteData);
      }

      navigate("/clientes");
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
    navigate("/clientes");
  };

  const handleClienteDataChange = (e) => {
    const { name, value } = e.target;
    setClienteData((prevClienteState) => ({
      ...prevClienteState,
      [name]: value,
    }));
  };

  return (
    <>
      {clienteData && (
        <div className="container">
          <br />
          <div className="row">
            <h3>
              {clienteData.id !== undefined
                ? edicion
                  ? "Editar Cliente"
                  : "Ver Cliente"
                : "Crear Cliente"}
            </h3>
          </div>
          <br />
          <form>
            <div className="row">
              {clienteData.id !== undefined ? (
                <div className="col">
                  <label style={{ fontWeight: "bold" }}>ID</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled="true"
                    name="id"
                    value={clienteData.id}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <br />
            <div className="row">
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Tipo de documento</label>
                <input
                  type="text"
                  className="form-control"
                  name="tipoDocumento"
                  disabled={
                    clienteData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleClienteDataChange}
                  value={clienteData.tipoDocumento}
                />
              </div>
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Número de documento</label>
                <input
                  type="text"
                  className="form-control"
                  name="noDocumento"
                  disabled={
                    clienteData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleClienteDataChange}
                  value={clienteData.noDocumento}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Edad</label>
                <input
                  type="text"
                  className="form-control"
                  name="edad"
                  disabled={
                    clienteData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleClienteDataChange}
                  value={clienteData.edad}
                />
              </div>
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
                    clienteData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleClienteDataChange}
                  value={clienteData.nombres}
                />
              </div>
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  name="apellidos"
                  disabled={
                    clienteData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleClienteDataChange}
                  value={clienteData.apellidos}
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
                    clienteData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleClienteDataChange}
                  value={clienteData.correo}
                />
              </div>
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  name="telefono"
                  disabled={
                    clienteData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleClienteDataChange}
                  value={clienteData.telefono}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  name="direccion"
                  disabled={
                    clienteData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleClienteDataChange}
                  value={clienteData.direccion}
                />
              </div>
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Ciudad</label>
                <input
                  type="text"
                  className="form-control"
                  name="ciudad"
                  disabled={
                    clienteData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleClienteDataChange}
                  value={clienteData.ciudad}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Notas</label>
                <input
                  type="text"
                  className="form-control"
                  name="notas"
                  disabled={
                    clienteData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleClienteDataChange}
                  value={clienteData.notas}
                />
              </div>
            </div>

            <br />
            {clienteData.id !== undefined ? (
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
                        clienteData.fechaCreacion
                        ? format(
                            clienteData.fechaCreacion,
                            "dd-MM-yyyy HH:mm"
                          )
                        : clienteData.fechaCreacion
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
                        clienteData.fechaActualizacion
                        ? format(
                            clienteData.fechaActualizacion,
                            "dd-MM-yyyy HH:mm"
                          )
                        : clienteData.fechaActualizacion
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
            {clienteData.id === undefined || (edicion != null && edicion) ? (
              <button
                type="button"
                onClick={() => handleUpdateCliente()}
                className="btn btn-success"
              >
                {clienteData.id !== undefined ? "Editar" : "Crear"}
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

export default ClientePage;
