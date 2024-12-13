"use client";
import { getProductList } from "@/apis/services/product.service";
import { ProductCard } from "./productCard";
import { useEffect, useState } from "react";
import { getCategoryById } from "@/apis/services/category.service";
import { getSubCategoryById } from "@/apis/services/subCategory.service";

export const ProductCategoryMain: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [subCategories, setSubCategories] = useState<Record<string, string>>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const productsPerPage = 88;
  const number = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductList(currentPage, productsPerPage);
        console.log("Fetched data:", data);
        setProducts(data.products);
        setTotalProducts(data.total);
        console.log("Total products set:", data.total);

        const subCategoryNames: Record<string, string> = {};
        for (const product of data.products) {
          const subCategoryData = await getSubCategoryById(product.subcategory);
          subCategoryNames[product.subcategory] =
            subCategoryData.subcategory.name;
        }
        setSubCategories(subCategoryNames);

        setLoading(false);
      } catch (error: any) {
        console.error("Error in fetchProducts:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  return (
    <section className="px-20 py-1 flex flex-col gap-20">

      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-2xl text-gray-700">گردنبند وآویز</h2>
        <div className="flex justify-center items-center gap-6">
          {products.map(
            (product,index) =>
                index<5 &&
              product.category === "674f5e9bd4ce8b2f706d402b" && (
                <ProductCard
                  key={product._id}
                  title={product.name}
                  price={product.price}
                  src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                />
              )
          )}
          <button className="text-lg text-gray-600 font-semibold bg-slate-300 px-3 py-32 rounded-xl">بیشتر</button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-2xl text-gray-700">انگشتر</h2>
        <div className="flex justify-center items-center gap-6">
          {products.map(
            (product,index) =>
                index<25 &&
              product.category === "674f605dd4ce8b2f706d402c" && (
                <ProductCard
                  key={product._id}
                  title={product.name}
                  price={product.price}
                  src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                />
              )
          )}
          <button className="text-lg text-gray-600 font-semibold bg-slate-300 px-3 py-32 rounded-xl">بیشتر</button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-2xl text-gray-700">ست و نیم ست</h2>
        <div className="flex justify-center items-center gap-6">
          {products.map(
            (product,index) =>
                index<43 &&
              product.category === "674f60ced4ce8b2f706d402e" && (
                <ProductCard
                  key={product._id}
                  title={product.name}
                  price={product.price}
                  src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                />
              )
          )}
          <button className="text-lg text-gray-600 font-semibold bg-slate-300 px-3 py-32 rounded-xl">بیشتر</button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-2xl text-gray-700">دستبند</h2>
        <div className="flex justify-center items-center gap-6">
          {products.map(
            (product,index) =>
                index<62 &&
              product.category === "674f6113d4ce8b2f706d402f" && (
                <ProductCard
                  key={product._id}
                  title={product.name}
                  price={product.price}
                  src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                />
              )
          )}
          <button className="text-lg text-gray-600 font-semibold bg-slate-300 px-3 py-32 rounded-xl">بیشتر</button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-2xl text-gray-700">گوشواره</h2>
        <div className="flex justify-center items-center gap-6">
          {products.map(
            (product,index) =>
                index<82 &&
              product.category === "674f614cd4ce8b2f706d4030" && (
                <ProductCard
                  key={product._id}
                  title={product.name}
                  price={product.price}
                  src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                />
              )
          )}
          <button className="text-lg text-gray-600 font-semibold bg-slate-300 px-3 py-32 rounded-xl">بیشتر</button>
        </div>
      </div>


    </section>
  );
};
