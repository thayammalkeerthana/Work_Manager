"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import UserContext from "@/context/userContext";
import { logOutUser } from "@/services/taskService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CustomNavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const contextData = useContext(UserContext);
    const router = useRouter();

    console.log('contextData', contextData);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const doLogout = async () => {
        try {
            const result = await logOutUser(router);
            contextData.setUser(undefined);
            console.log('result', result);    
        } catch (error) {
            console.log('logout error', error);
            toast.error('Logged out not successfully', {
                position: 'top-center'
            })
        }
    }
    return (
        <div className="fixed top-0 w-full z-10 bg-blue-950">
            <nav className="flex justify-between h-16 px-4 py-2 items-center text-white">
                <div className="brand">
                    <h1 className="text-2xl font-bold">
                        <a>Work Manager</a>
                    </h1>
                </div>
                <div className="block md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
                {contextData?.user && <div className="hidden md:flex space-x-3 font-bold">
                    <Link href="/" className="hover:text-blue-200">Home</Link>
                    <Link href="/addTask" className="hover:text-blue-200">Add Task</Link>
                    <Link href="/showTask" className="hover:text-blue-200">Show Task</Link>
                </div>}
                {contextData?.user ? <div className="hidden md:flex space-x-3 font-bold">
                    <Link href='#' className="hover:text-blue-200">{contextData?.user?.name}</Link>
                    <button className="hover:text-blue-200" onClick={() => doLogout()}>logOut</button>
                </div> : <div className="hidden md:flex space-x-3 font-bold">
                    <Link href='/login' className="hover:text-blue-200">Login</Link>
                    <Link href="/signup" className="hover:text-blue-200">Sign Up</Link>
                </div>}
            </nav>
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={toggleMenu}></div>
            )}
            <div className={`fixed top-0 left-0 h-full w-64 bg-blue-950 text-white transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-30`}>
                <div className="p-4">
                    <h1 className="text-2xl font-semibold">
                        <a>Work Manager</a>
                    </h1>
                </div>
                <ul className="flex flex-col space-y-2 p-4">
                    <li><Link href="/" className="block py-2 hover:text-blue-200">Home</Link></li>
                    <li><Link href="/addTask" className="block py-2 hover:text-blue-200">Add Task</Link></li>
                    <li><Link href="/showTask" className="block py-2 hover:text-blue-200">Show Task</Link></li>
                    <li><Link href='/login' className="block py-2 hover:text-blue-200">Login</Link></li>
                    <li><Link href='/signup' className="block py-2 hover:text-blue-200">Sign Up</Link></li>
                </ul>
            </div>
        </div>
    );
};
