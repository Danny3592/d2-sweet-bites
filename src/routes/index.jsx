
import FrontLayout from "../pages/front/FrontLayout";
import Home from "../pages/front/Home";
import Cart from "../pages/front/Cart";
import ProductList from "../pages/front/ProductList";
import AdminLogin from "../pages/dashboard/AdminLogin";
import AdminRegister from "../pages/dashboard/AdminRegister";
import AdminProducts from "../pages/dashboard/AdminProducts";
import AdminCoupon from '../pages/dashboard/AdminCoupon';
import AdminNews from '../pages/dashboard/AdminNews';
import NotFound from "../pages/NotFound";
import { createHashRouter } from "react-router-dom";
import App from "../App";
import AdminLayout from "../components/AdminLayout";
import ProductDetail from './../pages/front/ProductDetail';
import UserLayout from "../pages/front/UserLayout";
import UserFavorite from "../pages/front/UserFavorite";

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
            element: <Home />,
          },
          {
            path: 'product-list',
            element: <ProductList />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: 'product-details/:productId',
            element: <ProductDetail />,
          },
        ],
      },
      {
        path: "user",
        element: <UserLayout />,
        children: [
          {
            path: 'favorite',
            element: <UserFavorite />
          }
        ],
      },
      {
        path: 'admin-login',
        element: <AdminLogin />,
      },
      {
        path: 'admin-register',
        element: <AdminRegister />,
      },
      {
        path: 'dashboard',
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminProducts />,
          },
          {
            path: "coupon",
            element: <AdminCoupon />,
          },
          {
            path: "news",
            element: <AdminNews />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  }
];

const router = createHashRouter(routes);
export default router;
