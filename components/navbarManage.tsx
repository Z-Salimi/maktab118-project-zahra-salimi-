"use client";
import { logoutRequest } from "@/apis/services/auth.service";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";

export const NavbarManagement: React.FC = () => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (pathname: string) => {
    return path.includes(pathname) ? "bg-slate-100" : "bg-slate-200";
  };
  const handleLogout = () => {
    logoutRequest();
    window.location.href = "/"; // Redirect to home after logout
  };

  return (
    <section>
      <div className="flex flex-col items-start text-lg text-gray-700 font-semibold bg-gray-200 w-full h-full md:w-[25vw] md:h-full relative">
        <div className="fixed top-0 z-50 flex justify-between items-center w-full px-4 bg-slate-200 py-2 md:hidden">
          <img src="/digizarger.png" alt="Logo" className="w-32" />
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </button>
        </div>
        <div
          className={`fixed top-0 left-0 right-0 bg-gray-200 z-20 md:relative md:flex md:flex-col md:items-start md:mt-4 transition-transform transform ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          } md:translate-y-0 duration-500`}
        >
          <img
            src="/digizarger.png"
            alt="Logo"
            className="w-64 mt-4 hidden md:block"
          />
          <div className={`shadow-md mb-3 w-full md:w-[25vw]`}>
            <Link href={"/"}>
              <button
                className={`mt-10 rounded-md w-full p-6 transition-all ease-in-out duration-500 hover:bg-slate-100`}
              >
                صفحه اصلی
              </button>
            </Link>
          </div>
          <div className={`shadow-md mb-3 w-full md:w-[25vw]`}>
            <Link href={"/admin/management/manageProduct"}>
              <button
                className={`${isActive(
                  "/admin/management/manageProduct"
                )} rounded-md w-full p-6 transition-all ease-in-out duration-500 hover:bg-slate-100`}
              >
                مدیریت محصولات
              </button>
            </Link>
          </div>
          <div className={`shadow-md mb-3 w-full md:w-[25vw]`}>
            <Link href={"/admin/management/manageStock"}>
              <button
                className={`${isActive(
                  "/admin/management/manageStock"
                )} rounded-md w-full p-6 transition-all ease-in-out duration-500 hover:bg-slate-100`}
              >
                مدیریت موجودی و قیمت
              </button>
            </Link>
          </div>
          <div className={`shadow-md mb-3 w-full md:w-[25vw]`}>
            <Link href={"/admin/management/orders"}>
              <button
                className={`${isActive(
                  "/admin/management/orders"
                )} rounded-md w-full p-6 transition-all ease-in-out duration-500 hover:bg-slate-100`}
              >
                مدیریت سفارش ها
              </button>
            </Link>
          </div>
          <div className={`shadow-md mb-3 w-full md:w-[25vw]`}>

          <button
            className="rounded-md w-full p-6 transition-all ease-in-out duration-500 hover:bg-slate-100 flex justify-center items-center gap-4"
            onClick={handleLogout}
          >
            <MdExitToApp className="size-6 text-gray-600" />خروج
          </button>
          </div>

        </div>
      </div>
    </section>
  );
};
