import React, { useEffect, useState } from "react";
import * as categoriasService from "../../../services/categorias/categoriasService";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import ModalWithAction from "../../../components/utils/modales/ModalWithAction";

const CategoriaPage = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categoriaData, setCategoriaData] = useState(null);
  const [edicion, setEdicion] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const cerrarModalEliminar = () => setMostrarModalEliminar(false);

  useEffect(() => {
    if (id !== undefined || categoriaData !== null) getCategoriaById();
    else setCategoriaData({ nombre: null });
  }, []);

  const getCategoriaById = async () => {
    try {
      const result = await categoriasService.GetCagoriasById(id);
      setEdicion(location.pathname.includes("/editar"));
      setCategoriaData(result);
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message ??
          err.message ??
          "Error desconocido, comuniquese con el administrador"
      );
      setMostrarModalEliminar(true);
    }
  };

  const handleUpdateCategoria = async () => {
    try {
      if (categoriaData.id !== undefined) {
        const result = await categoriasService.PutCategorias(categoriaData.id, {
          nombre: categoriaData.nombre,
        });
      } else {
        const result = await categoriasService.PostCategorias({
          nombre: categoriaData.nombre,
        });
      }

      navigate("/categorias");
    } catch (err) {
      console.log(err)
      setErrorMessage(
        err.response?.data?.message ??
          err.message ??
          "Error desconocido, comuniquese con el administrador"
      );
      setMostrarModalEliminar(true);
    }
  };

  const handleReturn = () => {
    navigate("/categorias");
  };

  const handleCategoriaDataChange = (e) => {
    const { name, value } = e.target;
    setCategoriaData((prevCategoriaState) => ({
      ...prevCategoriaState,
      [name]: value,
    }));
  };

  return (
    <>
      {categoriaData && (
        <div className="container">
          <br />
          <div className="row">
            <h3>
              {categoriaData.id !== undefined
                ? edicion
                  ? "Editar Categoría"
                  : "Ver Categoría"
                : "Crear Categoría"}
            </h3>
          </div>
          <br />
          <form>
            <div className="row">
              {categoriaData.id !== undefined ? (
                <div className="col">
                  <label style={{ fontWeight: "bold" }}>ID</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled="true"
                    name="id"
                    value={categoriaData.id}
                  />
                </div>
              ) : (
                ""
              )}
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  disabled={
                    categoriaData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleCategoriaDataChange}
                  value={categoriaData.nombre}
                />
              </div>
            </div>

            <br />
            {categoriaData.id !== undefined ? (
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
                      categoriaData.fechaCreacion
                        ? format(
                            categoriaData.fechaCreacion,
                            "dd-MM-yyyy HH:mm"
                          )
                        : categoriaData.fechaCreacion
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
                      categoriaData.fechaActualizacion
                        ? format(
                            categoriaData.fechaActualizacion,
                            "dd-MM-yyyy HH:mm"
                          )
                        : categoriaData.fechaActualizacion
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
            {categoriaData.id === undefined || (edicion != null && edicion) ? (
              <button
                type="button"
                onClick={() => handleUpdateCategoria()}
                className="btn btn-success"
              >
                {categoriaData.id !== undefined ? "Editar" : "Crear"}
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
      <ModalWithAction mostrar={mostrarModalEliminar} cerrarModal={cerrarModalEliminar} titulo={'Error'} descripcion={errorMessage}/>
    </>
  );
};

export default CategoriaPage;
