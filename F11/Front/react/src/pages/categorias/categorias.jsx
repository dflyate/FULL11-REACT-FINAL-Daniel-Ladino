import React, { useEffect, useState } from "react";
import * as categoriasService from "../../services/categorias/categoriasService";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ModalWithAction from "../../components/utils/modales/ModalWithAction";

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const tooltipDelete = <Tooltip id="tooltip">Eliminar categoría</Tooltip>;
  const tooltipUpdate = <Tooltip id="tooltip">Editar categoría</Tooltip>;
  const tooltipShow = <Tooltip id="tooltip">Mostrar categoría</Tooltip>;
  const cerrarModalEliminar = () => setMostrarModalEliminar(false);
  const abrirModalEliminar = (data) => {
    setCategoriaSeleccionada(data)
    setMostrarModalEliminar(true);
  }
  useEffect(() => {
    handleGetCategorias();
  }, []);

  const handleGetCategorias = async () => {
    try {
      const result = await categoriasService.GetCagorias();
      setCategorias(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategoria = async () => {
    console.log(categoriaSeleccionada.id);
    try {
      const result = await categoriasService.DeleteCategorias(categoriaSeleccionada.id);
      handleGetCategorias();
      setMostrarModalEliminar(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <br />
      <div className="row">
        <h3>Lista de categorías</h3>
      </div>
      <br />
      <div className="row">
        <div className="col-lg-12">
          <Link className="btn btn-primary " to={"/categorias/nuevo"}>
            <FaPlus /> Crear categoría
          </Link>
          <br />
          <br />
          <table className="table table-stripped ">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.length > 0 &&
                categorias.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.nombre}</td>
                    <td>
                      <div className="btn-group">
                        <OverlayTrigger
                          placement="bottom"
                          overlay={tooltipShow}
                        >
                          <Link className="btn btn-warning rounded-circle " to={"/categorias/ver/" + data.id}>
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
                            to={"/categorias/editar/" + data.id}
                          >
                            <FaEdit />
                          </Link>
                        </OverlayTrigger>
                        &nbsp;
                        <OverlayTrigger
                          placement="bottom"
                          overlay={tooltipDelete}
                        >
                          <Link className="btn btn-danger rounded-circle " onClick={() => abrirModalEliminar(data)}>
                            <FaTrash />
                          </Link>
                        </OverlayTrigger>
                      </div>
                      <ModalWithAction mostrar={mostrarModalEliminar} accion={handleDeleteCategoria} cerrarModal={cerrarModalEliminar} titulo={'Eliminar Categoría'} descripcion={`¿Está seguro de eliminar la categoría ${categoriaSeleccionada.nombre}?`}/>
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

export default CategoriasPage;
