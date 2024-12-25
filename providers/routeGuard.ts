// 'use client';
// import { useEffect } from 'react';
// import { getToken } from '@/utils/session.managment';
// import { usePathname, useRouter } from 'next/navigation';

// interface IChild{
//     children:any;
// }
// const RouteGuard = ({ children }:IChild) => {
//   const router = useRouter();
//   const path = usePathname();
//   useEffect(() => {
//     const token = getToken();
//     if (!token && path.includes("admin")) {
//       router.push('/admin/auth/login');
//     }
//   }, [router]);

//   return children;
// };

// export default RouteGuard;


"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getToken } from "@/utils/session.managment";
import { toast } from "react-toastify";

interface IChild {
  children: React.ReactNode;
}

const RouteGuard: React.FC<IChild> = ({ children }) => {
  const router = useRouter();
  const path = usePathname();
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const token = getToken();
    const role = localStorage.getItem("role");

    if (!token) {
      toast.error("برای ادامه روند لطفا وارد شوید");

      if (!path.includes("/login") && !path.includes("/signup")) {
        router.push("/users/auth/login");
      } else {
        setIsAuthLoaded(true);
      }
    } else {
      if (path.includes("/admin") && role !== "ADMIN") {
      toast.error("کاربر گرامی شما اجازه دسترسی به این سیستم را ندارید");
        router.push("/");
      } else if (role !== "USER" && !path.includes("/admin")) {
      toast.error("مدیر گرامی شما اجازه دسترسی به این سیستم را ندارید");
        router.push("/users/auth/login");
      } else {
        setIsAuthLoaded(true);
      }
    }
  }, [router, path]);

  if (!isAuthLoaded) {
    return null;
  }

  return isAuthLoaded && children;
};

export default RouteGuard;
