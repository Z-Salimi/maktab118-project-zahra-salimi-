"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { usePagination } from "@/hooks/usePagination";
import { getProductList, updateProduct } from "@/apis/services/product.service";
import { getCategoryById } from "@/apis/services/category.service";
import { getSubCategoryById } from "@/apis/services/subCategory.service";
import { UpdateModal } from "@/components/updateModal";

export const AllProductManage: React.FC = () => {
  // const productsPerPage = 10;
  //  const { currentPage, totalPages, handleNextPage, handlePrevPage, setTotalPages } = usePagination(0, productsPerPage);
  //   const { data, isLoading, error } = useFetchProducts(currentPage, productsPerPage);
  //   console.log(data);

  //    useEffect(() => {
  //      if (data) {
  //       setTotalPages(Math.ceil(data.total / productsPerPage));
  //      }
  //     }, [data , setTotalPages]);
  //     const { products, categories, subCategories } = data;
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [subCategories, setSubCategories] = useState<Record<string, string>>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductList(currentPage, productsPerPage);
        setProducts(data.products);
        setTotalProducts(data.total);
        const categoryNames: Record<string, string> = {};
        for (const product of data.products) {
          const categoryData = await getCategoryById(product.category);
          categoryNames[product.category] = categoryData.category.name;
        }
        setCategories(categoryNames);
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

  const totalPages = Math.ceil(totalProducts / productsPerPage);
  console.log("Total pages:", totalPages);

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

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const handleUpdateProduct = async (updatedProduct: IProduct) => {
    if (selectedProduct) {
      try {
        await updateProduct(selectedProduct._id, updatedProduct);
        const data = await getProductList(currentPage, productsPerPage);
        setProducts(data.products);
        closeModal();
      } catch (error) {
        console.error("Failed to update product:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="flex flex-col p-10 w-full h-[90vh] rounded-xl">
      <div className="flex justify-center w-full">
        <div className="w-full text-sm text-center bg-slate-50">
          <table className="w-full table-auto bg-white">
            <thead className="text-[16px] text-gray-700 bg-slate-300 w-full table table-fixed">
              <tr>
                <th className="px-6 py-3 cursor-pointer">تصویر</th>
                <th className="px-6 py-3 border-x-2 border-gray-300 cursor-pointer">
                  نام کالا
                </th>
                <th className="px-6 py-3 border-x-2 border-gray-300 cursor-pointer">
                  دسته بندی
                </th>
                <th className="px-6 py-3">عملیات</th>
              </tr>
            </thead>
            <tbody
              dir="ltr"
              className="bg-slate-50 h-[70vh] overflow-y-auto block w-full"
            >
              {products?.map?.((product) => (
                <tr
                  dir="rtl"
<<<<<<< HEAD
                    key={product._id}
                    className="border-b-2 border-gray-300 w-full table table-fixed"
                  >
                    <td className="px-6 py-4 flex justify-center items-center">
                      <img
                        src={}
                        className="w-50 h-20 rounded-lg"
                        alt=""
=======
                  key={product._id}
                  className="border-b-2 border-gray-300 w-full table table-fixed"
                >
                  <td className="px-6 py-4 flex justify-center items-center">
                    <img
                      src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                      className="w-50 h-20 rounded-lg"
                      alt=""
                    />
                  </td>
                  <td className="px-6 py-4 border-x-2">{product.name}</td>
                  <td className="px-6 py-4 border-x-2 border-gray-300">
                    {categories[product.category] || "در حال بارگذاری..."}/
                    {subCategories[product.subcategory] || "در حال بارگذاری..."}
                  </td>
                  <td className="px-6 py-4 ">
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        text="ویرایش"
                        className="bg-green-600 hover:bg-green-700 rounded-md text-white"
                        onClick={() => openModal()}
>>>>>>> feature/add_updateModal
                      />
                      <Button
                        text="حذف"
                        className="bg-red-600 hover:bg-red-700 rounded-md text-white"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center gap-4 mt-4 py-2 bg-slate-300">
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
      {isOpen  && <UpdateModal close={closeModal} product={selectedProduct} onProductUpdated={() => handleUpdateProduct(selectedProduct)} />}
    </section>
  );
};
