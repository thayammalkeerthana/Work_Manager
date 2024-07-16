import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import "./globals.css";
import CustomNavBar from '../components/navBar.js';
import Footer from '../components/footer.js';
import UserProvider from '../context/userProvider.js';

const inter = Inter({ subsets: ["latin"] });
import React from 'react';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
  <body className="flex flex-col min-h-screen">
    <UserProvider>
    <ToastContainer />
    <CustomNavBar />
    <main className="flex-grow overflow-y-auto pt-16 mb-16">
        {children}
    </main>
    <Footer />
    </UserProvider>
</body>

    </html>
  );
}
