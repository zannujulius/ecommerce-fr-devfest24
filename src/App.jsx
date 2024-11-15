import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Route,
  Router,
  Routes,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./screens/Login";
import toast, { Toaster } from "react-hot-toast";
import ProductPage from "./screens/ProductPage";
import Register from "./screens/Register";
import { Button } from "antd";

function App() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <div className="w-screen h-screen flex flex-col items-center justify-center">
              <h1>Page not found.</h1>
              <Button
                onClick={() => {
                  navigate(-1);
                }}
              >
                Go back
              </Button>
            </div>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/product" element={<ProductPage />} />
        </Route>
      </Routes>
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
}

export default App;

const ProtectedRoute = () => {
  const [userToken, setUserToken] = useState(false);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        let token = await localStorage.getItem("token");
        if (!token) {
          setUserToken(false);
          setloading(false);
          return;
        }
        setUserToken(true);
        setloading(false);
      } catch (err) {
        toast.error(err.message);
      }
    })();
  }, []);

  if (loading) return <div className="">fetching resource....</div>;
  return userToken ? <Outlet /> : <Navigate to="/" />;
};
