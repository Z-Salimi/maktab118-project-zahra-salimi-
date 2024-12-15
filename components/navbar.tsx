import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FilterSideBar } from "./filterSideBar";
import Link from "next/link";
import { Button } from "./button";
import { Input } from "./input";
import { FaUser, FaUserTie } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

const navigation = [
  { name: "گردنبند وآویز", href: "#", current: false },
  { name: "انگشتر", href: "#", current: false },
  { name: "ست ونیم ست", href: "#", current: false },
  { name: "دستبند", href: "#", current: false },
  { name: "گوشواره", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Navbar() {
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
          <div className="flex items-center justify-between w-full px-4">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="digizarger.png"
                className="h-10 w-auto md:h-15"
              />
            </div>
            <div className="hidden md:block w-[30vw]">
              <Input type="search" placeholder="جستجو..." />
            </div>
            <div className="pl-8">
              <div className=" justify-center items-center gap-4 hidden md:flex">
                <Link href={"/auth/login"}>
                  <Button text="ورود" />
                </Link>
                <Link href={"/admin/auth/login"}>
                  <Button text="پنل مدیریت" />
                </Link>
              </div>
              <div className="flex justify-center items-center gap-4 md:hidden">
                <Link title="User-Login" href={"/auth/login"}>
                  <FaUserCircle className="size-6 text-gray-600" />
                </Link>
                <Link href={"/admin/auth/login"}>
                  <FaUserTie title="Admin-Login" className="size-6 text-gray-600" />
                </Link>
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
