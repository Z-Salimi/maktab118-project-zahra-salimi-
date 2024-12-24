"use client";
import { ProductCard } from "./productCard";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import Link from "next/link";

export const ProductCategoryMain: React.FC = () => {
  const currentPage = 1;
  const productsPerPage = 88;

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

  const categories = [
    {
      name: "گردنبند وآویز",
      id: "674f5e9bd4ce8b2f706d402b",
      link: "/categories/necklace",
    },
    {
      name: "انگشتر",
      id: "674f605dd4ce8b2f706d402c",
      link: "/categories/ring",
    },
    {
      name: "ست و نیم ست",
      id: "674f60ced4ce8b2f706d402e",
      link: "/categories/set",
    },
    {
      name: "دستبند",
      id: "674f6113d4ce8b2f706d402f",
      link: "/categories/bracelet",
    },
    {
      name: "گوشواره",
      id: "674f614cd4ce8b2f706d4030",
      link: "/categories/earring",
    },
  ];

  return (
    <section className="px-20 py-1 flex flex-col gap-20">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex flex-col justify-center items-center md:items-start gap-4"
        >
          <h2 className="font-semibold text-2xl text-gray-700">
            {category.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:justify-center lg:items-center xl:flex gap-6 w-full">
            {data?.products
              .filter((product) => product.category === category.id)
              .slice(0, 5)
              .map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  image={`http://localhost:8000/images/products/images/${product.images[0]}`}
                />
              ))}
            <Link href={category.link}>
              <button className="text-lg text-gray-600 font-semibold bg-slate-300 p-2 md:p-0 md:w-[10vw] md:h-[38vh] rounded-xl transition-all ease-in-out duration-300 hover:bg-slate-400 hover:text-white">
                بیشتر
              </button>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};
