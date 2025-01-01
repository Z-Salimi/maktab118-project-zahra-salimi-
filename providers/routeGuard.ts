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
      if (path.includes("cart")) {
        toast.error("برای ادامه روند لطفا وارد شوید");
        router.push("/users/auth/login");
      }  else {
        setIsAuthLoaded(true);
      }
    } else {
      if (path.includes("/admin") && role !== "ADMIN") {
        toast.error("کاربر گرامی شما اجازه دسترسی به این سیستم را ندارید");
        router.push("/");
      }  else {
        setIsAuthLoaded(true);
      }
    }
  }, [router, path]);

  if (!isAuthLoaded) {
    return null;
  }

  return children;
};

export default RouteGuard;
