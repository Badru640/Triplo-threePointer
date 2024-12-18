"use client"

import { useState, useEffect, useRef } from "react";
import { FiMenu, FiBell } from "react-icons/fi"; 
import { motion } from "framer-motion"; 
import Link from "next/link"; 

export const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = (): void => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <header className="bg-sky-400  p-4 flex items-center justify-between">
        <div className="flex items-center">
          <FiMenu
            size={25}
            onClick={toggleSidebar}
            className="cursor-pointer"
          />
        </div>
<div className="flex">
<img src="/path-to-your-logo.png" alt="Logo" className="w-8 mr-2 h-8 object-contain" />
        <h1 className="font-extrabold text-xl">Triplo-3Pointer</h1>
</div>

        <div className="flex items-center space-x-4">
          <FiBell className="text-2xl" />
        </div>
      </header>

      {sidebarOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={toggleSidebar}
          />

          <motion.div
            ref={sidebarRef}
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-64 h-full bg-primary-foreground text-white shadow-lg z-50 p-4"
          >
            <h2 className="font-bold text-2xl">Menu</h2>
            <ul className="mt-6 space-y-3">
              <li>
                <Link href="/" passHref className="block text-lg py-2 hover:text-blue-400 transition-all duration-100 ease-in-out">
                Home
                </Link>
              </li>
              <li>
                <Link href="/about" passHref className="block text-lg py-2 hover:text-blue-400 transition-all duration-300 ease-in-out">
                sobre
                </Link>
              </li>
              <li>
                <Link href="/contatos" passHref className="block text-lg py-2 hover:text-blue-400 transition-all duration-300 ease-in-out">
                contacto
                </Link>
              </li>
              <li>
                <Link href="/configuracoes" passHref className="block text-lg py-2 hover:text-blue-400 transition-all duration-300 ease-in-out">
                configuracoes
                </Link>
              </li>
            </ul>
            <button
              onClick={toggleSidebar}
              className="mt-6 bg-red-600 text-white px-4 py-2 rounded-xl text-lg hover:bg-red-700 transition-all duration-200 ease-in-out"
            >
              Fechar
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
};
