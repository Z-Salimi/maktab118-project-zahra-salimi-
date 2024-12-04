import Link from "next/link";
import React from "react";
import { Input } from "./input";
import { Button } from "./button";

export const Navbar: React.FC = () => {
  return (
    <header className="px-6 py-3 flex justify-around items-center gap-4 w-full bg-gray-200">
      <img src="digizarger.png" alt="Logo" className="w-64" />
      <div className="w-[30vw]">
        <Input type="search" placeholder="جستجو..." />
      </div>
      <div className="flex justify-center items-center gap-4">
        <Link href={"/auth/login"}>
          <Button text="ورود" />
        </Link>
        <Link href={"/admin/auth/login"}>
          <Button text="پنل مدیریت" />
        </Link>
      </div>
    </header>
  );
};
