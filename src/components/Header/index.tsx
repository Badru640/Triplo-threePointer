"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FiMenu, FiBell } from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Jogos", href: "/jogos" },
    { label: "Sobre Mim", href: "/about" },
    { label: "Contato", href: "/contatos" },
    { label: "Configurações", href: "/configuracoes" },
  ];

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative">
      <header className="bg-sky-400 p-4 flex items-center justify-between">
        <FiMenu size={25} onClick={() => setSidebarOpen(!sidebarOpen)} className="cursor-pointer" />

        <div className="flex">
          <Image src="https://scontent.fdel27-4.fna.fbcdn.net/v/t39.30808-6/469125680_4033284073624887_6050273715200359634_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=Y2SEQ1PqTU4Q7kNvgGxk7S7&_nc_oc=Adj4Jw8vxMHrFRqtzLx7ErphXJvCTQVt_xMBzfPPvwC_M7Nt22UOEx9y6_8RoZA66O6WdkWD5W9NbyLGXBNQpfdr&_nc_zt=23&_nc_ht=scontent.fdel27-4.fna&_nc_gid=AHzbWlK2_nXrojRj7drKCVO&oh=00_AYD3EdrA0cFyba9hFACuXirml1dIzWdlkgTz4m_Rnt1cUg&oe=67B1A651" alt="Logo" width={100} height={100} className="w-8 mr-2 rounded-full h-8 object-cover" />
          <h1 className="font-extrabold text-xl cursor-pointer"
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          >Triplo-3Pointer</h1>
        </div>

        <FiBell className="text-2xl" />
      </header>

      {sidebarOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setSidebarOpen(false)}
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
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="block text-lg py-2 hover:text-blue-400 transition-all duration-300 ease-in-out"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSidebarOpen(false)}
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