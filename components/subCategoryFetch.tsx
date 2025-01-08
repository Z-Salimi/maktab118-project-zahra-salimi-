"use client";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import React from "react";
import { ProductCard } from "./productCard";
import { useParams } from "next/navigation";

const subCategoryNames = {
  "67473eac6d7d32d8385eb325": "مدال و پلاك",
  "674f63a0d4ce8b2f706d4035": "گردبند رولباسي",
  "674f651cd4ce8b2f706d403a": "انگشتر زنانه",
  "674f657ad4ce8b2f706d403b": "حلقه ازدواج",
  "674f6763d4ce8b2f706d4046": "دستبند زنجيري",
  "674f67acd4ce8b2f706d4047": "دستبند بنگل",
  "674f66bcd4ce8b2f706d4042": "نيم ست",
  "674f6637d4ce8b2f706d403f": "سرویس کامل",
  "674f68fbd4ce8b2f706d404c": "گوشواره آویز",
  "674f68b0d4ce8b2f706d404b": "گوشواره ميخي",
};

export const SubCategoryFetch: React.FC = () => {
  const currentPage = 1;
  const productsPerPage = 88;
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const { id } = useParams();
  console.log(id);

  const { data, error, isLoading } = useFetchProducts(
    currentPage,
    productsPerPage
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const subCategoryName = subCategoryNames[id] || "محصولات زیر دسته";

  return (
    <section className="px-20 py-1 flex flex-col gap-20">
      <h2 className="font-semibold text-2xl text-gray-700 pt-10">
        {subCategoryName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.products
          .filter((product) => product.subcategory === id)
          .map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              image={`http://localhost:8000/images/products/images/${product.images[0]}`}
              userId={userId}
            />
          ))}
      </div>
    </section>
  );
};
