import Link from "next/link";
import React from "react";
import { Input } from "./input";
import { Button } from "./button";

export const Navbar: React.FC = () => {
  return (
    <header className="px-6 py-3 flex justify-around items-center gap-4 w-full">
      <div className="flex justify-center items-center gap-4">
        <Link href={"/auth/login"}>
          <button className="bg-gray-100 px-6 py-1 rounded-xl text-gray-900 font-semibold border-r-2 border-b-2 border-gray-100 shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray]">
            ورود
          </button>
        </Link>
        <Link href={"/admin/auth/login"}>
          <Button text="پنل مدیریت" />
        </Link>
      </div>
      <div className="w-[30vw]">
        <Input type="search" placeholder="Search..." />
      </div>
      <img src="digizarger.png" alt="Logo" className="w-64" />
    </header>
  );
};
