import FrontLayout from "../pages/front/FrontLayout";
import Home from "../pages/front/Home";
import Cart from "../pages/front/Cart";
import ProductList from "../pages/front/ProductList";
import AdminLogin from "../pages/dashboard/AdminLogin";
import AdminRegister from "../pages/dashboard/AdminRegister";
import AdminProducts from "../pages/dashboard/AdminProducts";
import AdminCoupon from "../pages/dashboard/AdminCoupon";
import AdminNews from "../pages/dashboard/AdminNews";
import AdminDonate from "../pages/dashboard/AdminDonate";
import AdminUsers from "../pages/dashboard/AdminUsers";
import NotFound from "../pages/NotFound";
import { createHashRouter } from "react-router-dom";
import App from "../App";
import AdminLayout from "../components/AdminLayout";
import ProductDetail from "./../pages/front/ProductDetail";
import Checkout from "../pages/front/Checkout";
import UserCoupons from "../pages/front/UserCoupons";
import UserLayout from "../pages/front/UserLayout";
import UserCharity from "../pages/front/UserCharity";
import UserFavorite from "../pages/front/UserFavorite";
import UserProfile from "../pages/front/UserProfile";
import OrderCheck from "../pages/front/OrderCheck";
import OrderComplete from "../pages/front/OrderComplete";
import NewsList from "../pages/front/NewsList";
import NewsDetail from "../pages/front/NewsDetail";

const routes = [
  {
    path: "/",
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
            path: "product-list",
            element: <ProductList />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "order-check",
            element: <OrderCheck />,
          },
          {
            path: "product-details/:productId",
            element: <ProductDetail />,
          },
          {
            path: "checkout",
            element: <Checkout />,
          },
          {
            path: "news-list",
            element: <NewsList />,
          },
          {
            path: "news-detail/:id",
            element: <NewsDetail />,
          },
          {
            path: "order-complete",
            element: <OrderComplete />,
          },
        ],
      },
      {
        path: "user",
        element: <UserLayout />,
        children: [
          {
            path: "favorite",
            element: <UserFavorite />,
          },
          {
            path: "profile/:userId",
            element: <UserProfile />,
          },
          {
            path: "checkout",
            element: <Checkout />,
          },
          {
            path: "coupon",
            element: <UserCoupons />,
          },
          {
            path: "charity",
            element: <UserCharity />,
          },
        ],
      },
      {
        path: "admin-login",
        element: <AdminLogin />,
      },
      {
        path: "admin-register",
        element: <AdminRegister />,
      },
      {
        path: "dashboard",
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
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

const router = createHashRouter(routes);
export default router;
