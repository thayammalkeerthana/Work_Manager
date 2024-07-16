import React from 'react';
import { Metadata } from "next";
import { Login } from './login';



export const metadata:Metadata = {
  title: "Login : work Manager",
};

const LoginPage = ( ) => {
    return (
        <>
        <Login/>
        </>
    )
}

export default LoginPage;
