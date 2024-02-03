import React, { useEffect, useState } from "react";
import * as productosService from "../../../services/productos/productosService";
import * as categoriasService from "../../../services/categorias/categoriasService";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import ModalWithAction from "../../../components/utils/modales/ModalWithAction";

export const ProductoPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [productoData, setProductoData] = useState(null);
  const [edicion, setEdicion] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const cerrarModalEliminar = () => setMostrarModalEliminar(false);

  useEffect(() => {
    handleGetCategorias();
    if (id !== undefined || productoData !== null) getProductoById();
    else
      setProductoData({
        nombre: null,
        precio: null,
        imagen: null,
        descripcion: null,
      });
  }, []);

  const handleGetCategorias = async () => {
    try {
      const result = await categoriasService.GetCagorias();
      setCategorias(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCategoria = (e) => {
      productoData.categoriaId = e.target.value;
      console.log(productoData.categoriaId );
  };

  const getProductoById = async () => {
    try {
      const result = await productosService.GetProductoById(id);
      setEdicion(location.pathname.includes("/editar"));
      setProductoData(result);
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message ??
          err.message ??
          "Error desconocido, comuniquese con el administrador"
      );
      setMostrarModalEliminar(true);
    }
  };

  const handleUpdateProducto = async () => {
    try {
      if(productoData.categoriaId !== undefined){
        if (productoData.id !== undefined) {
          const result = await productosService.PutProducto(productoData.id,{
            nombre: productoData.nombre,
            precio: productoData.precio,
            imagen: productoData.imagen,
            categoriaId: productoData.categoriaId ,
            descripcion: productoData.descripcion,
          });
        } else {
          const result = await productosService.PostProducto(productoData);
        }
  
        navigate("/productos");
      }else {
        setErrorMessage('Es necesario seleccionar la categoría')
        setMostrarModalEliminar(true);
      }
      
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
    navigate("/productos");
  };

  const handleProductoDataChange = (e) => {
    const { name, value } = e.target;
    setProductoData((prevProductoState) => ({
      ...prevProductoState,
      [name]: value,
    }));
  };

  return (
    <>
      {productoData && (
        <div className="container">
          <br />
          <div className="row">
            <h3>
              {productoData.id !== undefined
                ? edicion
                  ? "Editar Producto"
                  : "Ver Producto"
                : "Crear Producto"}
            </h3>
          </div>
          <br />
          <form>
            <div className="row">
              {productoData.id !== undefined ? (
                <div className="col">
                  <label style={{ fontWeight: "bold" }}>ID</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled="true"
                    name="id"
                    value={productoData.id}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <br />
            <div className="row">
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  disabled={
                    productoData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleProductoDataChange}
                  value={productoData.nombre}
                />
              </div>
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Precio</label>
                <input
                  type="text"
                  className="form-control"
                  name="precio"
                  disabled={
                    productoData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleProductoDataChange}
                  value={productoData.precio}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
              <label style={{ fontWeight: "bold" }}>Categoría</label>
                <select
                  className="form-select"
                  aria-label="Categorias" value={productoData.categoriaId}
                  disabled={
                    productoData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={(e) => handleChangeCategoria(e)}
                >
                  <option selected defaultValue="NA">
                    --Seleccione--
                  </option>

                  {categorias.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Imagen</label>
                <input
                  type="text"
                  className="form-control"
                  name="imagen"
                  disabled={
                    productoData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleProductoDataChange}
                  value={productoData.imagen}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Descrición</label>
                <input
                  type="text"
                  className="form-control"
                  name="descripcion"
                  disabled={
                    productoData.id === undefined
                      ? false
                      : edicion
                      ? false
                      : true
                  }
                  onChange={handleProductoDataChange}
                  value={productoData.descripcion}
                />
              </div>
            </div>

            <br />
            {productoData.id !== undefined ? (
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
                      productoData.fechaCreacion
                        ? format(productoData.fechaCreacion, "dd-MM-yyyy HH:mm")
                        : productoData.fechaCreacion
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
                      productoData.fechaActualizacion
                        ? format(
                            productoData.fechaActualizacion,
                            "dd-MM-yyyy HH:mm"
                          )
                        : productoData.fechaActualizacion
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
            {productoData.id === undefined || (edicion != null && edicion) ? (
              <button
                type="button"
                onClick={() => handleUpdateProducto()}
                className="btn btn-success"
              >
                {productoData.id !== undefined ? "Editar" : "Crear"}
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
export default ProductoPage;
