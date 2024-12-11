'use client'
import React, { useState } from "react";
import { Input } from "./input";
import { updateProduct } from "@/apis/services/product.service";

interface IModal {
  close?: () => void;
  product: IProduct[]; 
  onProductUpdated: () => void; 
}

export const UpdateModal: React.FC<IModal> = ({ close, product, onProductUpdated }) => {
  const [productName, setProductName] = useState<string>(product.name);
  const [productCategory, setProductCategory] = useState<string>(product.category);
  const [productImage, setProductImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProductImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      name: productName,
      category: productCategory,
      image: productImage, 
    };

    try {
      await updateProduct(product._id, updatedProduct);
      onProductUpdated();
      close?.();
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 sm:items-center ">
          <div className="relative transform  rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg mx-4">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start flex items-start gap-2">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-200 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <div className="mt-3 sm:ml-4 sm:mt-0 flex flex-col justify-center">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                    >ویرایش کالا/افزودن

                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="m-2 ">
                      <Input type="file" placeholder="تصویر کالا" onChange={handleFileChange} />
                    </div>
                    <div className="m-2 ">
                      <Input placeholder="نام کالا" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </div>
                    <div className="m-2 ">
                      <Input placeholder="دسته بندی کالا" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} />
                    </div>
                    <div className="bg-gray-50 px-4 py-3 gap-4 sm:flex justify-center items-center sm:px-6">
                      <button
                        type="submit"
                        className=" mt-3 inline-flex w-full justify-center rounded-md bg-green-700 px-20 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-800 sm:mt-0 sm:w-auto"
                      >
                        تایید
                      </button>
                      <button
                        type="button"
                        onClick={close}
                        className=" mt-3 inline-flex w-full justify-center rounded-md bg-gray-500 px-20 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-600 sm:mt-0 sm:w-auto"
                      >
                        برگشت
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
