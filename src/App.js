import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import UserRegisterPage from "./pages/UserRegisterPage";
import UserLoginPage from "./pages/UserLoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./components/route/ProtectedRoute";
import LayOut from "./components/layout/LayOut";
import CartPage from "./pages/CartPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardProductsPage from "./pages/DashboardProductsPage";
import DashboardOrdersPage from "./pages/DashboardOrdersPage";
import DashboardUsersPage from "./pages/DashboardUsersPage";

function App() {
  const url = "http://localhost:5125";

  // get all products
  const urlForProductList = "http://localhost:5125/api/v1/subcategories/products?limit=1000&offset=0";
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

  // get user data
  const urlForUserData = "http://localhost:5125/api/v1/users/auth";
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserUpdated, setIsUserUpdated] = useState(true);
  function getUserData() {
    setIsUserLoading(true);
    if (token) {
      axios.get(urlForUserData, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          setUserData(res.data);
          setIsUserLoading(false);
          setIsAuthenticated(true);
        })
        .catch((err) => {
          console.log(err);
          setIsUserLoading(false);
          setIsAuthenticated(false);
        });
    } else {
      setUserData({});
      setIsAuthenticated(false);
      setIsUserLoading(false);
    }
  }
  useEffect(() => {
    getUserData();
  }, [token, isUserUpdated]);

  const [isUserAdmin, setIsUserAdmin] = useState(false);
  function checkAdmin() {
    setIsUserLoading(true);
    if (userData) {
      if (userData.role === "Admin") {
        setIsUserAdmin(true);
        setIsUserLoading(false);
      }
      else {
        setIsUserAdmin(false);
        setIsUserLoading(false);
      }
    }
    else {
      setIsUserAdmin(false);
      setIsUserLoading(false);
    }
  }
  useEffect(() => {
    checkAdmin();
  }, [userData, token, isUserUpdated]);


  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut isAuthenticated={isAuthenticated} isUserAdmin={isUserAdmin} />,
      children: [
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
          element: <UserLoginPage setToken={setToken} />,
        },
        {
          path: "/user/profile",
          element: <ProtectedRoute isUserLoading={isUserLoading} isAuthenticated={isAuthenticated} element={<UserProfilePage userData={userData} setUserData={setUserData} isUserUpdated={isUserUpdated} setIsUserUpdated={setIsUserUpdated} setIsAuthenticated={setIsAuthenticated} />} />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/dashboard",
          element: <ProtectedRoute isUserLoading={isUserLoading} isAuthenticated={isAuthenticated} isUserAdmin={isUserAdmin} shouldCheckAdmin={true} element={<DashboardPage />} />,
        },
        {
          path: "/dashboard/products",
          element: <ProtectedRoute isUserLoading={isUserLoading} isAuthenticated={isAuthenticated} isUserAdmin={isUserAdmin} shouldCheckAdmin={true} element={<DashboardProductsPage allProductList={allProductList} getProducts={getProducts} />} />,
        },
        {
          path: "/dashboard/orders",
          element: <ProtectedRoute isUserLoading={isUserLoading} isAuthenticated={isAuthenticated} isUserAdmin={isUserAdmin} shouldCheckAdmin={true} element={<DashboardOrdersPage />} />,
        },
        {
          path: "/dashboard/users",
          element: <ProtectedRoute isUserLoading={isUserLoading} isAuthenticated={isAuthenticated} isUserAdmin={isUserAdmin} shouldCheckAdmin={true} element={<DashboardUsersPage />} />,
        },
        {
          // TODO:make a page for 404
          path: "*",
          element: <p>Not Found</p>,
        },
      ]
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
