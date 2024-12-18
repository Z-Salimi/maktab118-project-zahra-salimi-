"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useTokenExpiration } from "@/hooks/loginExp";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { useUpdateProductStock } from "@/hooks/useProduct";
import { toast } from "react-toastify";
import { FaAnglesLeft } from "react-icons/fa6";

export const StockProductManage: React.FC = () => {
  useTokenExpiration();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<{
    [key: string]: { price?: number; quantity?: number };
  }>({});
  const [changedProducts, setChangedProducts] = useState<IProduct[]>([]);
  const productsPerPage = 12;
  const { data, error, isLoading } = useFetchProducts(
    currentPage,
    productsPerPage
  );
  const updateProductMutation = useUpdateProductStock();
  const totalPages = data ? Math.ceil(data.total / productsPerPage) : 0;

  useEffect(() => {
    if (data) {
      const initialEditedValues: {
        [key: string]: { price?: number; quantity?: number };
      } = {};
      data.products.forEach((product) => {
        initialEditedValues[product._id] = {
          price: product.price,
          quantity: product.quantity,
        };
      });
      setEditedValues(initialEditedValues);
    }
  }, [data]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleInputChange = (
    productId: string,
    field: keyof IProduct,
    value: string
  ) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [productId]: {
        ...prevValues[productId],
        [field]:
          field === "price" || field === "quantity" ? Number(value) : value,
      },
    }));
    setChangedProducts((prevChangedProducts) => {
      const changedProductIndex = prevChangedProducts.findIndex(
        (product) => product._id === productId
      );
      if (changedProductIndex === -1) {
        const changedProduct = data?.products.find(
          (product) => product._id === productId
        );
        return changedProduct
          ? [
              ...prevChangedProducts,
              { ...changedProduct, [field]: Number(value) },
            ]
          : prevChangedProducts;
      } else {
        return prevChangedProducts.map((product, index) =>
          index === changedProductIndex
            ? { ...product, [field]: Number(value) }
            : product
        );
      }
    });
  };

  const handleSave = async () => {
    const updatePromises = changedProducts.map((product) => {
      const updatedProduct = { ...product, ...editedValues[product._id] };
      return updateProductMutation.mutateAsync({
        productId: product._id,
        updatedProduct,
      });
    });
    try {
      await Promise.all(updatePromises);
      setEditingProductId(null);
      setChangedProducts([]);
      setEditedValues({});
      toast.success("تغییرات ذخیره شد");
    } catch (error) {
      toast.error("خطا در ذخیره تغییرات");
      console.error("Failed to update products:", error);
    }
  };

  const handleFieldClick = (productId: string, field: "price" | "quantity") => {
    setEditingProductId(productId);
    const element = document.getElementById(`${productId}-${field}`);
    if (element) {
      element.focus();
    }
  };

  const handleCancelEdit = (productId: string) => {
    setEditedValues((prevValues) => {
      const { [productId]: _, ...rest } = prevValues;
      return rest;
    });
    setChangedProducts((prevChangedProducts) =>
      prevChangedProducts.filter((product) => product._id !== productId)
    );
    setEditingProductId(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="flex flex-col px-8 py-10 w-full h-[90vh] rounded-xl">
      <div className="flex justify-between">
        <h2 className="text-xs md:text-xl font-bold p-2">مدیریت موجودی و قیمت ها</h2>
        <Button
          text="ذخیره"
          disabled={changedProducts.length === 0}
          className="bg-green-600 hover:bg-green-700 rounded-md text-white w-1/6 mb-4 flex justify-center items-center text-xs md:text-lg"
          onClick={handleSave}
        />
      </div>
      <div className="flex justify-center w-full">
        <div className="w-full text-sm text-center bg-slate-100">
          <table className="w-full table-auto bg-white">
            <thead className="text-[16px] text-gray-700 bg-slate-300 w-full table table-fixed">
              <tr>
                <th className="px-6 py-3 border-x-2 border-gray-300 cursor-pointer text-center text-xs md:text-sm">
                  نام کالا
                </th>
                <th className="px-6 py-3 border-x-2 border-gray-300 cursor-pointer text-xs md:text-sm">
                  قیمت
                </th>
                <th className="px-6 py-4 md:py-3 text-xs md:text-sm">موجودی</th>
              </tr>
            </thead>
            <tbody
              dir="ltr"
              className="bg-slate-100 h-[70vh] overflow-y-auto block w-full"
            >
              {data?.products.map((product) => (
                <tr
                  dir="rtl"
                  key={product._id}
                  className="border-b-2 border-gray-400 w-full table table-fixed"
                >
                  <td className="px-6 py-4 text-xs md:text-sm flex justify-center">{product.name}</td>
                  <td className=" py-4 border-x-2 border-gray-400 text-xs md:text-sm w-20 md:w-40">
                    {editingProductId === product._id ? (
                      <input
                        id={`${product._id}-price`}
                        type="number"
                        value={
                          editedValues[product._id]?.price ?? product.price
                        }
                        onChange={(e) =>
                          handleInputChange(
                            product._id,
                            "price",
                            e.target.value
                          )
                        }
                        className="bg-slate-100 text-center rounded px-2 py-1 w-full"
                        onKeyDown={(e) => {
                          if (e.key === "Escape") {
                            handleCancelEdit(product._id);
                          }
                        }}
                      />
                    ) : (
                      <p onClick={() => handleFieldClick(product._id, "price")}>
                        {editedValues[product._id]?.price ?? product.price}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs md:text-sm ">
                    {editingProductId === product._id ? (
                      <input
                        id={`${product._id}-quantity`}
                        type="number"
                        value={
                          editedValues[product._id]?.quantity ??
                          product.quantity
                        }
                        onChange={(e) =>
                          handleInputChange(
                            product._id,
                            "quantity",
                            e.target.value
                          )
                        }
                        className="bg-slate-100 text-center rounded px-2 py-1 w-full"
                        onKeyDown={(e) => {
                          if (e.key === "Escape") {
                            handleCancelEdit(product._id);
                          }
                        }}
                      />
                    ) : (
                      <p
                        onClick={() =>
                          handleFieldClick(product._id, "quantity")
                        }
                      >
                        {editedValues[product._id]?.quantity ??
                          product.quantity}
                      </p>
                    )}
                  </td>
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
