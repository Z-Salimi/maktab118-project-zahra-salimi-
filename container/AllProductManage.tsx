"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAngleDoubleRight } from "react-icons/fa";
import { UpdateModal } from "@/components/updateModal";
import { useTokenExpiration } from "@/hooks/loginExp";
import { useDeleteProduct, useUpdateProduct } from "@/hooks/useProduct";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { DeleteModal } from "@/components/deleteModal";
import { CreateModal } from "@/components/createModal";

export const AllProductManage: React.FC = () => {
  useTokenExpiration();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 10;

  const { data, isLoading, isError, refetch } = useFetchProducts(
    currentPage,
    productsPerPage
  );
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const totalPages = data ? Math.ceil(data.total / productsPerPage) : 0;

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
    setSelectedProduct(null);
    setIsOpen(false);
    setIsOpenDelete(false);
    setIsOpenCreate(false);
  };

  const openModal = (product: IProduct) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const openModalDelete = (product: IProduct) => {
    setSelectedProduct(product);
    setIsOpenDelete(true);
  };
  const openModalCreate = () => {
    setIsOpenCreate(true);
  };

  const handleUpdateProduct = async (updatedProduct: IProduct) => {
    if (selectedProduct) {
      updateProductMutation.mutate({
        productId: selectedProduct._id,
        updatedProduct,
      });
      closeModal();
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (selectedProduct) {
      deleteProductMutation.mutate(selectedProduct._id);
      closeModal();
    }
  };
  const handleCreateProduct = async () => {
      closeModal();
      refetch();
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError}</div>;

  return (
    <section className="flex flex-col p-10 w-full h-[90vh] rounded-xl">
      <div className="flex flex-col justify-center items-end gap-4 w-full">
        <Button
          text="افزودن"
          className="bg-green-600 hover:bg-green-700 rounded-md text-white w-1/4"
          onClick={openModalCreate}
        />
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
              {Array.isArray(data?.products) &&
                data.products.map((product) => (
                  <tr
                    dir="rtl"
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
                      {data.categories[product.category] ||
                        "در حال بارگذاری..."}
                      /
                      {data.subCategories[product.subcategory] ||
                        "در حال بارگذاری..."}
                    </td>
                    <td className="px-6 py-4 ">
                      <div className="flex items-center justify-center gap-4">
                        <Button
                          text="ویرایش"
                          className="bg-slate-600 hover:bg-slate-700 rounded-md text-white"
                          onClick={() => openModal(product)}
                        />
                        <Button
                          text="حذف"
                          className="bg-red-600 hover:bg-red-700 rounded-md text-white"
                          // onClick={() => handleDeleteProduct(product._id)}
                          onClick={() => openModalDelete(product)}
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
      {isOpen && selectedProduct && (
        <UpdateModal
          close={closeModal}
          product={selectedProduct}
          onProductUpdated={() => handleUpdateProduct(selectedProduct)}
        />
      )}
      {isOpenDelete && selectedProduct && (
        <DeleteModal
          close={closeModal}
          productName={selectedProduct.name}
          productImage={selectedProduct.images[0]}
          onConfirm={() => handleDeleteProduct(selectedProduct._id)}
        />
      )}
      {isOpenCreate  && (
        <CreateModal
          close={closeModal}
          onProductCreated={()=> handleCreateProduct()}
        />
      )}
    </section>
  );
};
