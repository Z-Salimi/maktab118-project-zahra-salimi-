"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../button";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const subCategories = {
  necklace: [
    { id: "67473eac6d7d32d8385eb325", name: "مدال و پلاك" },
    { id: "674f63a0d4ce8b2f706d4035", name: "گردبند رولباسي" },
  ],
  ring: [
    { id: "674f651cd4ce8b2f706d403a", name: "انگشتر زنانه" },
    { id: "674f657ad4ce8b2f706d403b", name: "حلقه ازدواج" },
  ],
  set: [
    { id: "674f66bcd4ce8b2f706d4042", name: "نيم ست" },
    { id: "674f6637d4ce8b2f706d403f", name: "سرویس کامل" },
  ],
  bracelet: [
    { id: "674f6763d4ce8b2f706d4046", name: "دستبند زنجيري" },
    { id: "674f67acd4ce8b2f706d4047", name: "دستبند بنگل" },
  ],
  earring: [
    { id: "674f68fbd4ce8b2f706d404c", name: "گوشواره آویز" },
    { id: "674f68b0d4ce8b2f706d404b", name: "گوشواره ميخي" },
  ],
};

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

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
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
        {Object.keys(subCategories).map((category) => (
          <div key={category} className="relative">
            <div
              onClick={() => toggleCategory(category)}
              className="flex items-center cursor-pointer"
            >
              <Link href={`/categories/${category}`}>
                <Button
                  text={category === "necklace" ? "گردبند و آویز" :
                       category === "ring" ? "انگشتر" :
                       category === "set" ? "ست و نیم ست" :
                       category === "bracelet" ? "دستبند" :
                       category === "earring" ? "گوشواره" : ""}
                  className={`${isActive(`/categories/${category}`)} border-2 border-white whitespace-nowrap`}
                  />
              </Link>
                  {activeCategory === category ? (
                    <ChevronUpIcon className="w-5 h-5 ml-2" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 ml-2" />
                  )}
            </div>
            {activeCategory === category && (
              <div className="absolute left-0 mt-1 w-48 bg-slate-100 border border-gray-200 rounded-md shadow-lg z-10">
                {subCategories[category].map((sub) => (
                  <Link key={sub.id} href={`/categories/${category}/${sub.id}`}>
                    <button className="block px-4 py-2 text-sm w-full text-gray-700 hover:bg-slate-300">
                      {sub.name}
                    </button>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
