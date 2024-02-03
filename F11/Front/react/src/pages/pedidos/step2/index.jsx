import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setPedidoStepAction,
  setStepPedidoComponentAction,
} from "../../../redux/slices/pedidoComponentSlice";
import { useSelector } from "react-redux";
import * as categoriasService from "../../../services/categorias/categoriasService";
import * as productosService from "../../../services/productos/productosService";

const SegundoPasoPedido = () => {
  const { step, pedidoData } = useSelector(
    (state) => state.pedidoComponentStore
  );
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState(
    pedidoData.productos
  );

  const formatoMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  });

  const dispatch = useDispatch();

  const handleNext = (step) => {
    dispatch(setStepPedidoComponentAction(step));
  };

  useEffect(() => {
    handleGetCategorias();
  }, []);

  useEffect(() => {
    const payload = {
      productos: productosSeleccionados,
    };
    dispatch(setPedidoStepAction(payload));
  }, [productosSeleccionados]);

  const handleGetCategorias = async () => {
    try {
      const result = await categoriasService.GetCagorias();
      setCategorias(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeProductos = (id) => {
    console.log(id);
    const productoSeleccionado = productos.find(
      (producto) => producto.id === id
    );
    const productoExistente = productosSeleccionados.find(
      (producto) => producto.id === productoSeleccionado.id
    );
    console.log(productoExistente);
    if (productoExistente) {
      const nuevosProductos = productosSeleccionados.map((p) =>
        p.id === productoSeleccionado.id
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      );
      setProductosSeleccionados(nuevosProductos);
    } else {
      // Si el producto no está en la lista, agregarlo con la cantidad
      setProductosSeleccionados([
        ...productosSeleccionados,
        { ...productoSeleccionado, cantidad: 1 },
      ]);
    }
  };

  const handleGetProductos = async (categoriaId) => {
    try {
      console.log(categoriaId)
      const result = await productosService.GetProductoByCategoriaId(categoriaId);
      console.log(result)
      setProductos(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <br />
      <div className="row">
        <div className="col-lg-12">
          <h5>{`Paso ${step}: Seleccione los productos de la factura de acuerdo a la categoría`}</h5>
          <br />

          <form>
            <div className="row">
              <div className="col">
                <label style={{ fontWeight: "bold" }}>Categoría</label>
                <br />
                <nav className="navbar navbar-expand-lg mr-2">
                  <ul className="navbar-nav mr-2">
                    {categorias.map((data) => (
                      <li className="nav-item" key={data.id} value={data.id}>
                        <button
                          type="button"
                          onClick={() => handleGetProductos(data.id)}
                          className="btn btn-primary"
                          style={{ marginRight: "10px", marginTop: "10px", width: "150px" }}
                        >
                          {data.nombre}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </form>

          <div className="container mt-4">
            <div className="row">
              {productos.length > 0 &&
                productos.map((data) => (
                  <div className="col-md-4 mb-4" key={data.id}>
                    <div
                      className="card text-center"
                      style={{ width: "18rem" }}
                    >
                      <img
                        className="card-img-top"
                        src={data.imagen}
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{data.nombre}</h5>
                        <p className="card-text">$ {formatoMoneda.format(data.precio)}</p>
                        <button
                          href="#"
                          className="btn btn-success"
                          onClick={(e) => handleChangeProductos(data.id)}
                        >
                          Añadir al carrito
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="col">
          <br />
          <button
            onClick={() => handleNext(3)}
            type="button"
            className="btn btn-success"
          >
            Siguiente
          </button>
        </div>
        <div className="col">
          <br />
          <button
            type="button"
            onClick={() => handleNext(1)}
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

export default SegundoPasoPedido;
