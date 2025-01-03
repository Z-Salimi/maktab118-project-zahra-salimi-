// components/Navbar.tsx
"use client";
import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FilterSideBar } from "./filterSideBar";
import Link from "next/link";
import { Input } from "../input";
import { CartIcon } from "./CartIcon";
import { UserSection } from "./UserSection";
import { useRouter } from "next/navigation";
import { logoutRequest } from "@/apis/services/auth.service";
import { classNames, navigation } from "@/utils/navigation";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const cartItemsCount = 0;
  const username =
    typeof window !== "undefined" ? localStorage.getItem("username") : null;

  const handleLogout = () => {
    logoutRequest();
    router.push("/");
  };

  return (
    <Disclosure as="nav" className="bg-gray-200 w-full px-3">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="relative flex h-16 items-center justify-between w-full">
          <div className="absolute inset-y-0 left-0 flex items-center justify-center md:hidden">
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
                <CartIcon cartItemsCount={cartItemsCount} />
                <UserSection username={username} handleLogout={handleLogout} />
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
};
