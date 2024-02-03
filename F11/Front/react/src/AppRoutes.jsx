import { createBrowserRouter } from "react-router-dom";
import HomePage from './pages/home/home'
import CategoriasPage from "./pages/categorias/categorias";
import ProductosPage from "./pages/productos/productos";
import ClientesPage from "./pages/clientes/clientes";
import PedidosPage from "./pages/pedidos/pedidos";
import LoginPage from "./pages/login/login";
import UsuariosPage from "./pages/usuarios/usuarios";
import MainLayout from "./layouts/main-layout";
import ReduxDemoPage from './pages/redux-demo/redux-demo'
import ContactoStepManualPage from "./pages/contacto/step-manual";
import ContactoStepReduxPage from "./pages/contacto/step-redux";
import PrivateRoute from "./components/private-routes";
import CategoriaPage from "./pages/categorias/ver/Categoria";
import ClientePage from "./pages/clientes/ver/Cliente";
import UsuarioPage from "./pages/usuarios/ver/Usuario";
import ProductoPage from "./pages/productos/ver/Producto";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
          path: "/",
          element: <PrivateRoute><HomePage/></PrivateRoute>,
        },
        {
          path: "/categorias",
          element: <PrivateRoute><CategoriasPage/></PrivateRoute>,
        },
        {
          path: "/categorias/editar/:id",
          element: <PrivateRoute><CategoriaPage/></PrivateRoute>,
        },
        {
          path: "/categorias/ver/:id",
          element: <PrivateRoute><CategoriaPage/></PrivateRoute>,
        },
        {
          path: "/categorias/nuevo",
          element: <PrivateRoute><CategoriaPage/></PrivateRoute>,
        },
        
        {
          path: "/clientes",
          element: <PrivateRoute><ClientesPage/></PrivateRoute>,
        },
        {
          path: "/clientes/editar/:id",
          element: <PrivateRoute><ClientePage/></PrivateRoute>,
        },
        {
          path: "/clientes/ver/:id",
          element: <PrivateRoute><ClientePage/></PrivateRoute>,
        },
        {
          path: "/clientes/nuevo",
          element: <PrivateRoute><ClientePage/></PrivateRoute>,
        },

        {
          path: "/usuarios",
          element: <PrivateRoute><UsuariosPage/></PrivateRoute>,
        },
        {
          path: "/usuarios/editar/:id",
          element: <PrivateRoute><UsuarioPage/></PrivateRoute>,
        },
        {
          path: "/usuarios/ver/:id",
          element: <PrivateRoute><UsuarioPage/></PrivateRoute>,
        },
        {
          path: "/usuarios/nuevo",
          element: <PrivateRoute><UsuarioPage/></PrivateRoute>,
        },

        {
          path: "/productos",
          element: <PrivateRoute><ProductosPage/></PrivateRoute>,
        },
        {
          path: "/productos/editar/:id",
          element: <PrivateRoute><ProductoPage/></PrivateRoute>,
        },
        {
          path: "/productos/ver/:id",
          element: <PrivateRoute><ProductoPage/></PrivateRoute>,
        },
        {
          path: "/productos/nuevo",
          element: <PrivateRoute><ProductoPage/></PrivateRoute>,
        },

        {
          path: "/pedidos",
          element: <PrivateRoute><PedidosPage/></PrivateRoute>,
        },

        {
          path: "/redux-demo",
          element: <PrivateRoute><ReduxDemoPage/></PrivateRoute>,
        },
        {
          path: "/contacto-manual",
          element: <PrivateRoute><ContactoStepManualPage/></PrivateRoute>,
        },
        {
          path: "/contacto-redux",
          element: <PrivateRoute><ContactoStepReduxPage/></PrivateRoute>,
        }
      ]
    },
    {
      path: "/login",
      element: <LoginPage/>,
    }
  ]);

export default router;