import React from 'react';
import { Metadata } from "next";
import { SignUp } from './signup';

export const metadata:Metadata = {
  title: "Sign up: work Manager",
};

const SignUpPage = ( ) => {
    return (
        <>
        <SignUp/>
        </>
    )
}

export default SignUpPage;