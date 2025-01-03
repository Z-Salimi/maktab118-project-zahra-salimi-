import { FilterSideBar } from "@/components/filterSideBar";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/Navbar/navbar";
import { NavbarManagement } from "@/components/navbarManage";
import React from "react";

const CategoriesLayout = ({
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
      <Footer />
    </div>
  );
};

export default CategoriesLayout;
