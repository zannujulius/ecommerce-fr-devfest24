import { Button, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // e.preventDefault();
    try {
      if (!(username && password)) {
        return toast.error("Both email and password are required");
      }

      let res = await axios.post(
        import.meta.env.VITE_LOGIN_API + "auth/register",
        {
          username,
          password,
        }
      );

      toast.success("User created. Login to continue");
      // localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        return;
      }
      console.log();
      toast.error(error.message);
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[400px] flex flex-col item-center justify-center">
        <h1 className="font-semibold text-2xl text-center ">
          Welcome to the Ecommerce app,{" "}
        </h1>
        <p className="font-light text-gray-500 text-center">
          Fill in the details below to register{" "}
        </p>
        <form className="">
          <div className="mt-4">
            <label className="text-sm mt-2 font-light py-2">Username</label>
            <Input
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
              size="large"
              placeholder="your email or username"
              className="font-light"
            />
          </div>
          <div className="mt-3">
            <div className="flex  justify-between">
              <label className="text-sm font-light py-2">Password</label>
              {/* <Link
                to={"/"}
                className="text-sm font-light py-2 hover:text-blue-500 underline"
              >
                Forgot password
              </Link> */}
            </div>
            <Input.Password
              size="large"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="***********"
              className="font-light"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </div>
          <Button
            // type="primary"
            size="large"
            onClick={handleSubmit}
            className="w-full bg-black text-white mt-4 bg-primary hover:!bg-primary-foreground"
          >
            Sign in{" "}
          </Button>
          <p className="font-light mt-2 text-center">
            Have an account,{" "}
            <Link className="  underline text-blue-500" to={"/"}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
