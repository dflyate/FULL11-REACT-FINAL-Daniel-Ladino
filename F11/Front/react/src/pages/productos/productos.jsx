import React, { useEffect, useState } from "react";
import * as productosService from "../../services/productos/productosService";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ModalWithAction from "../../components/utils/modales/ModalWithAction";

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState([]);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const tooltipDelete = <Tooltip id="tooltip">Eliminar producto</Tooltip>;
  const tooltipUpdate = <Tooltip id="tooltip">Editar producto</Tooltip>;
  const tooltipShow = <Tooltip id="tooltip">Mostrar producto</Tooltip>;
  const cerrarModalEliminar = () => setMostrarModalEliminar(false);
  const abrirModalEliminar = (data) => {
    setProductoSeleccionado(data);
    setMostrarModalEliminar(true);
  };
  useEffect(() => {
    handleGetProductos();
  }, []);

  const handleGetProductos = async () => {
    try {
      const result = await productosService.GetProductos();
      console.log(result)
      setProductos(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProducto = async () => {
    try {
      const result = await productosService.DeleteProducto(
        productoSeleccionado.id
      );
      handleGetProductos();
      setMostrarModalEliminar(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <br />
      <div className="row">
        <h3>Lista de productos</h3>
      </div>
      <br />
      <div className="row">
        <div className="col-lg-12">
          <Link className="btn btn-primary " to={"/productos/nuevo"}>
            <FaPlus /> Crear Producto
          </Link>
          <br />
          <br />
          <table className="table table-stripped ">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length > 0 &&
                productos.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.nombre}</td>
                    <td>{data.precio}</td>
                    <td>
                      <div className="btn-group">
                        <OverlayTrigger
                          placement="bottom"
                          overlay={tooltipShow}
                        >
                          <Link
                            className="btn btn-warning rounded-circle "
                            to={"/productos/ver/" + data.id}
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
                            to={"/productos/editar/" + data.id}
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
                        accion={handleDeleteProducto}
                        cerrarModal={cerrarModalEliminar}
                        titulo={"Eliminar Producto"}
                        descripcion={`¿Está seguro de eliminar el producto ${
                          productoSeleccionado.nombre
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

export default ProductosPage;