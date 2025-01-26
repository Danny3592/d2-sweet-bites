import FrontLayout from "../pages/front/FrontLayout";
import Home from "../pages/front/Home";
import ProductList from "../pages/front/ProductList";
import AdminLogin from "../pages/dashboard/AdminLogin";
import AdminProducts,{loader as productsLoader}  from "../pages/dashboard/AdminProducts";
// import Dashboard from '../pages/dashboard/Dashboard';  是否還需要留著
import NotFound from "../pages/NotFound";
import { createHashRouter } from "react-router-dom";
import App from "../App";
import AdminLayout from "../components/AdminLayout";

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <FrontLayout />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: 'product-list',
            element: <ProductList />
          },
        ]
      },
      {
        path: 'admin-login',
        element: <AdminLogin />
      },
      {
        path: 'dashboard', 
        element: <AdminLayout/>,
        children: [
          {
            index: true,
            element: <AdminProducts />,
            // loader:productsLoader
          },
        ]
      },
      {
        path: '*',
        element: <NotFound />
      },
    ]
  }
];

const router = createHashRouter(routes);
export default router;