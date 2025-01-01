"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FilterSideBar } from "./filterSideBar";
import Link from "next/link";
import { Button } from "./button";
import { Input } from "./input";
import { FaAngleDown, FaCartShopping } from "react-icons/fa6";
import { FaUserCircle, FaUserTie } from "react-icons/fa";
import { useState } from "react";
import { CartDropdown } from "./cartDropdown";
import { useAppSelector } from "@/Redux/hooks";
import { RootState } from "@/Redux/store";
import { logoutRequest } from "@/apis/services/auth.service";
import { MdExitToApp } from "react-icons/md";

const navigation = [
  { name: "صفحه اصلی", href: "/", current: false },
  { name: "گردنبند وآویز", href: "/categories/necklace", current: false },
  { name: "انگشتر", href: "/categories/ring", current: false },
  { name: "ست ونیم ست", href: "/categories/set", current: false },
  { name: "دستبند", href: "/categories/bracelet", current: false },
  { name: "گوشواره", href: "/categories/earring", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };
  const cartItemsCount = useAppSelector(
    (state: RootState) => state.cart.items.length
  );

  const username =
    typeof window !== "undefined" ? localStorage.getItem("username") : null;
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;

  const handleLogout = () => {
    logoutRequest();
    window.location.href = "/"; // Redirect to home after logout
  };

  return (
    <Disclosure as="nav" className="bg-gray-200 w-full px-3">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="relative flex h-16 items-center justify-between w-full">
          <div className="absolute inset-y-0 left-0 flex items-center justify-center md:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="/digizarger.png"
                className="h-10 w-auto md:h-15"
              />
            </div>
            <div className="hidden md:block w-[30vw]">
              <Input type="search" placeholder="جستجو..." />
            </div>

            <div className="pl-8">
              <div className="justify-center items-center gap-4 hidden md:flex">
                <div className="items-center hidden md:flex border-2 border-gray-400 rounded-full p-2 shadow-xl relative">
                  <div className="flex items-center gap-2">
                    <FaAngleDown
                      onClick={toggleCart}
                      className="ml-2 cursor-pointer"
                    />
                    {cartItemsCount > 0 && (
                      <span className="text-xs">{cartItemsCount}</span>
                    )}
                    <Link href={"/products/cart"}>
                      <FaCartShopping
                        className="size-6 text-gray-600"
                        onClick={toggleCart}
                      />
                    </Link>
                    {isOpen && <CartDropdown />}
                  </div>
                </div>
                {username ? (
                  <>
                    <span className="text-gray-600 flex items-center justify-center gap-2">
                      {username}
                      <FaUserCircle className="size-6 text-gray-600" />
                    </span>

                    <button
                      className="bg-slate-500 hover:bg-slate-700 text-white px-4 py-2 rounded-xl"
                      onClick={handleLogout}
                    >
                      خروج
                    </button>
                  </>
                ) : (
                  <>
                    <Link href={"/users/auth/login"}>
                      <Button text="ورود" />
                    </Link>
                    <Link href={"/admin/auth/login"}>
                      <Button text="پنل مدیریت" />
                    </Link>
                  </>
                )}
              </div>
              <div className="flex justify-center items-center gap-2 md:hidden border-2 border-gray-300 rounded-full p-1">
                <div className="flex items-center gap-2">
                  <FaAngleDown
                    onClick={toggleCart}
                    className="ml-2 cursor-pointer"
                  />
                  {cartItemsCount > 0 && (
                    <span className="text-xs">{cartItemsCount}</span>
                  )}
                  <Link href={"/products/cart"}>
                    <FaCartShopping
                      className="size-6 text-gray-600"
                      onClick={toggleCart}
                    />
                  </Link>
                  {isOpen && <CartDropdown />}
                </div>
                {username ? (
                  <>
                    <span className="text-gray-600 flex items-center justify-center gap-2">
                      <FaUserCircle className="size-6 text-gray-600" />
                    </span>
                    <button
                      className="text-white px-3 py-2 rounded-xl"
                      onClick={handleLogout}
                    >
                      <MdExitToApp className="size-6 text-gray-600" />
                    </button>
                  </>
                ) : (
                  <>
                    <Link title="User-Login" href={"/users/auth/login"}>
                      <FaUserCircle className="size-6 text-gray-600" />
                    </Link>
                    <Link href={"/admin/auth/login"}>
                      <FaUserTie
                        title="Admin-Login"
                        className="size-6 text-gray-600"
                      />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="justify-center mt-2 hidden md:flex w-full px-4">
          <FilterSideBar />
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-2 px-2 pt-4 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-400 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
