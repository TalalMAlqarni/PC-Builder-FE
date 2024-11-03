import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import UserRegisterPage from "./pages/UserRegisterPage";
import UserLoginPage from "./pages/UserLoginPage";

function App() {
  const url = "http://localhost:5125";

  const urlForProductList =
    "http://localhost:5125/api/v1/subcategories/products?limit=1000&offset=0";
  const [allProductList, setAllProductList] = useState([]);
  function getProducts() {
    axios
      .get(urlForProductList)
      .then((res) => {
        setAllProductList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <p>Home Page </p>,
    },
    {
      path: "/products",
      element: <ProductsPage allProductList={allProductList} />,
    },
    {
      path: "/products/:id",
      element: <ProductDetailPage />,
    },
    {
      path: "/user/register",
      element: <UserRegisterPage />,
    },
    {
      path: "/user/login",
      element: <UserLoginPage />,
    },

    {
      path: "*",
      element: <p>Not Found</p>,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
