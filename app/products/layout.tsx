import { FilterSideBar } from "@/components/filterSideBar";
import { Navbar } from "@/components/navbar";
import { NavbarManagement } from "@/components/navbarManage";
import React from "react";

const ProductsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full flex flex-col items-center">
      <Navbar />

      <main className="flex-grow flex flex-col justify-center items-center">
        {children}
      </main>
    </div>
  );
};

export default ProductsLayout;
