"use client";
import Link from "next/link";
import { Button } from "./button";
import { usePathname } from "next/navigation";

export const FilterSideBar: React.FC = () => {
  const path = usePathname();
  const isActive = (pathname: string) => {
    if (pathname === "/") {
      return path === pathname
        ? "bg-yellow-100 text-yellow-800"
        : "bg-yellow-400";
    }
    return path.includes(pathname)
      ? "bg-yellow-100 text-yellow-800"
      : "bg-yellow-400";
  };
  return (
    <section className="px-20 py-1">
      <div className="flex justify-center items-center gap-6">
        <Link href={"/"}>
          <Button
            text="صفحه اصلی"
            className={`${isActive("/")} border-2 border-white whitespace-nowrap`}
          />
        </Link>
        <Link href={"/categories/necklace"}>
          <Button
            text="گردبند و آویز"
            className={`${isActive(
              "/categories/necklace"
            )} border-2 border-white whitespace-nowrap`}
          />
        </Link>
        <Link href={"/categories/ring"}>
          <Button
            text="انگشتر"
            className={`${isActive(
              "/categories/ring"
            )} border-2 border-white whitespace-nowrap`}
          />
        </Link>
        <Link href={"/categories/set"}>
          <Button
            text="ست و نیم ست"
            className={`${isActive(
              "/categories/set"
            )} border-2 border-white whitespace-nowrap`}
          />
        </Link>
        <Link href={"/categories/bracelet"}>
          <Button
            text="دستبند"
            className={`${isActive(
              "/categories/bracelet"
            )} border-2 border-white whitespace-nowrap`}
          />
        </Link>
        <Link href={"/categories/earring"}>
          <Button
            text="گوشواره"
            className={`${isActive(
              "/categories/earring"
            )} border-2 border-white whitespace-nowrap`}
          />
        </Link>
      </div>
    </section>
  );
};
