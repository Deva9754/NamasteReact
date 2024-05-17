import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Body from "./components/body/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./components/error/Error";
import Header from "./components/header/Header.js";
import ProductCard from "./components/body/Product-card/ProductCard.js";
import Footer from "./components/footer/Footer.js";
import Placeorder from "./components/cart/PlaceOrder.js";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import LocationCheck from "./components/locationcheck/LocationCheck";
import Searchproduct from "./components/SearchProduct/SearchProduct.js";
const LazyCart = React.lazy(() => import("./components/cart/Cart.js"));
const LazyProductCard = React.lazy(() =>
  import("./components/body/Product-card/ProductCard.js")
);

const AppLayout = () => {
  window.scrollTo(0, 0);

  return (
    <>
      <Provider store={appStore}>
        <div className="app">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </Provider>
    </>
  );
};

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },

      {
        path: "/Cart",
        element: (
          <Suspense fallback={<h1>Data is loading</h1>}>
            <LazyCart />
          </Suspense>
        ),
      },
      {
        path: "/product-card/:proId",
        element: (
          <Suspense fallback={<h1>Data is loading</h1>}>
            <LazyProductCard />,
          </Suspense>
        ),
      },
      {
        path: "/SearchProduct/:ProTitle",
        element: <Searchproduct />,
      },
      {
        path: "/LocationCheck",
        element: <LocationCheck />,
      },
      {
        path: "/placeorder",
        element: <Placeorder />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoute} />);
