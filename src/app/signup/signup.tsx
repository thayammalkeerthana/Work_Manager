"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import SignUpImg from "../../../public/signUp.svg";
import { SignUpFunc } from '@/services/taskService';
import { useRouter } from 'next/navigation';

export const SignUp=()=>{
    const [data, setData] = useState({name:'',email:'',password:''});
    const [errors, setErrors] = useState({name:'',email:'',password:''});
    const router = useRouter();
    const validate = () => {
        let nameError = '';
        let emailError = '';
        let passwordError = '';
    
        if (!data.name.trim()) {
            nameError = 'Username is required';
        }
    
        if (!data.email.trim()) {
            emailError = 'email is required';
        }

        if (!data.email.match(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)){
            emailError = 'valid email is required';
        }
    
        if (!data.password.trim()) {
            passwordError = 'password is required';
        }
    
        if (nameError || emailError || passwordError) {
          setErrors({ name: nameError, email: emailError, password: passwordError });
          return false;
        }
    
        setErrors({ name: '', email: '', password: '' });
        return true;
      };

      const handleClick = async(e:any) =>{
        e.preventDefault();

        if (validate()) {
          // Proceed with submitting the form or other actions
          try {
            await SignUpFunc(data,router);
          } catch (error) {
            toast.error('SignUp not successfully',{
              position:'top-center'
            })
            console.log("error error error",error)
          }
        }
      }
    return(
        <div className="flex justify-center items-center mt-4 px-4 sm:px-0">
    <div className="border w-full sm:w-2/3 lg:w-1/2 p-5 hover:shadow-lg bg-gray-50 cursor-pointer">
        <div className="flex justify-center items-center my-5">
            <Image src={SignUpImg} className="w-1/3" alt="add_Task" />
        </div>
        <h1 className="text-3xl sm:text-xl text-center">Sign Up here !!</h1>
        <form action="#!">
            {/* User Name */}
            <div className="mt-4">
                <label htmlFor="user_name" className="block text-sm font-medium mb-2">
                    User Name
                </label>
                <input
                    type="text"
                    className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-100"
                    id="user_name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                {errors.name && <span className="text-red-600 text-sm">{errors.name}</span>}
            </div>
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
                {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
            </div>
               {/* Email */}
               <div className="mt-4">
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Password
                </label>
                <input
                    type="password"
                    className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-100"
                    id="password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                {errors.password && <span className="text-red-600 text-sm">{errors.password}</span>}
            </div>
  
            {/* Button action */}
            <div className="mt-4 flex justify-center space-x-3">
                <button className="bg-green-600 py-2 px-3 rounded-lg hover:bg-opacity-90 text-white w-1/3"  onClick={(e) => handleClick(e)}>
                   Sign Up
                </button>

            </div>
        </form>
    </div>
    
</div>
    )
}