"use client";
import { getProductList } from "@/apis/services/product.service";
import { getCategoryById } from "@/apis/services/category.service";
import { getSubCategoryById } from "@/apis/services/subCategory.service";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAngleDoubleRight } from "react-icons/fa";

export const StockProductManage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductList(currentPage, productsPerPage);
        setProducts(data.products);
        setTotalProducts(data.total);

        setLoading(false);
      } catch (error: any) {
        console.error("Error in fetchProducts:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="flex flex-col px-8 py-2 w-full h-[90vh] rounded-xl">
        <div className="flex justify-between">
            <h2 className="text-xl font-bold  p-2">مدیریت موجودی و قیمت ها</h2>
        <Button
        text="ذخیره"
        className="bg-green-600 hover:bg-green-700 rounded-md text-white w-1/6 mb-4"
      />
        </div>
      
      <div className="flex justify-center w-full">
        <div className="w-full text-sm text-center bg-slate-100">
          <table className="w-full table-auto bg-white">
            <thead className="text-[16px] text-gray-700 bg-slate-300 w-full table table-fixed">
              <tr>
                <th className="px-6 py-3 border-x-2 border-gray-300 cursor-pointer">
                  نام کالا
                </th>
                <th className="px-6 py-3 border-x-2 border-gray-300 cursor-pointer">
                  قیمت
                </th>
                <th className="px-6 py-3">موجودی</th>
              </tr>
            </thead>
            <tbody dir="ltr" className="bg-slate-100 h-[70vh] overflow-y-auto block w-full">
              {Array.isArray(products) &&
                products.map((product) => (
                  <tr
                  dir="rtl"
                    key={product._id}
                    className="border-b-2 border-gray-400 w-full table table-fixed"
                  >
                    <td className="px-6 py-4 ">"{product.name}"</td>
                    <td className="px-6 py-4 border-x-2 border-gray-400">
                      {product.price} تومان
                    </td>
                    <td className="px-6 py-4 ">{product.quantity}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center gap-4 py-2 bg-slate-300">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md text-white shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray] ${
                currentPage === 1
                  ? "bg-slate-400"
                  : "bg-slate-800 hover:bg-slate-900"
              }`}
            >
              <FaAngleDoubleRight />
            </button>
            <span>
              صفحه {currentPage} از {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md text-white shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray] ${
                currentPage === totalPages
                  ? "bg-gray-400"
                  : "bg-slate-800 hover:bg-slate-900"
              }`}
            >
              <FaAnglesLeft />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
