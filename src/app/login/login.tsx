"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import loginImg from "../../../public/login.svg";
import { loginFunc } from "@/services/taskService";
import UserContext from "@/context/userContext";

export const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();
  const contextData = useContext(UserContext);
  const { setUser }: any = contextData;
  const validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!data.email.trim()) {
      emailError = "email is required";
    }

    if (!data.email.match(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)) {
      emailError = "valid email is required";
    }

    if (!data.password.trim()) {
      passwordError = "password is required";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return false;
    }

    setErrors({ email: "", password: "" });
    return true;
  };

  const handleClick = async (e: any) => {
    e.preventDefault();

    if (validate()) {
      // Proceed with submitting the form or other actions
      try {
        let result = await loginFunc(data, router);
        console.log('result?.user',result?.user?.name);
        localStorage.setItem('userName',result?.user?.name);
        localStorage.setItem('userId',result?.user?._id);
        setUser(result?.user);
        return result;
      } catch (error) {
        toast.error("Login not successfully", {
          position: "top-center",
        });
        console.log("error error error", error);
      }
    }
  };
  return (
    <div className="flex justify-center items-center mt-4 px-4 sm:px-0">
      <div className="border w-full sm:w-2/3 lg:w-1/2 p-5 hover:shadow-lg bg-gray-50 cursor-pointer">
        <div className="flex justify-center items-center my-5">
          <Image src={loginImg} className="w-1/3" alt="add_Task" />
        </div>
        <h1 className="text-3xl sm:text-xl text-center">Login here !!</h1>
        <form action="#!">
          {/* Email */}
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-100"
              id="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            {errors.email && (
              <span className="text-red-600 text-sm">{errors.email}</span>
            )}
          </div>
          {/* Email */}
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-100"
              id="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            {errors.password && (
              <span className="text-red-600 text-sm">{errors.password}</span>
            )}
          </div>

          {/* Button action */}
          <div className="mt-4 flex justify-center space-x-3">
            <button
              className="bg-green-600 py-2 px-3 rounded-lg hover:bg-opacity-90 text-white w-1/3"
              onClick={(e) => handleClick(e)}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
