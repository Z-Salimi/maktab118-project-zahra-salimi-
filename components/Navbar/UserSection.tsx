import React from "react";
import Link from "next/link";
import { MdExitToApp } from "react-icons/md";
import { logoutRequest } from "@/apis/services/auth.service";
import { FaUserCircle, FaUserTie } from "react-icons/fa";
import { Button } from "../button";

interface UserSectionProps {
  username: string | null;
  handleLogout: () => void;
}

export const UserSection: React.FC<UserSectionProps> = ({ username, handleLogout }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {username ? (
        <>
          <div className="text-gray-600 flex items-center justify-center gap-2">
            {username}
            <FaUserCircle className="size-6 text-gray-600" />
          </div>
          <button
            className="bg-slate-500 hover:bg-slate-700 text-white px-4 py-1 ml-2 rounded-xl"
            onClick={handleLogout}
          >
            خروج
          </button>
        </>
      ) : (
        <div>
          <div className="flex md:hidden items-center justify-center gap-2">
            <Link href={"/users/auth/login"}>
              <FaUserCircle title="ورود" className="size-6 text-gray-600" />
            </Link>
            <Link href={"/admin/auth/login"}>
              <FaUserTie title="پنل مدیریت" className="size-6 text-gray-600" />
            </Link>
          </div>
          <div className=" md:flex items-center justify-center gap-2">
            <Link href={"/users/auth/login"}>
              <Button text="ورود" />
            </Link>
            <Link href={"/admin/auth/login"}>
            <Button text="پنل مدیریت" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
