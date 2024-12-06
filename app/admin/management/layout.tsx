// app/admin/management/layout.tsx
import { NavbarManagement } from "@/components/navbarManage";
import React from "react";

const ManagementLayout = ({ children }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="w-full flex">
      <NavbarManagement />
      <main className="flex-grow flex flex-col justify-center items-center h-screen">
        {children}
      </main>
    </div>
  );
};

export default ManagementLayout;
