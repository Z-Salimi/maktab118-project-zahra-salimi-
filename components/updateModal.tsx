"use client";
import React, { useEffect } from "react";
import { Input } from "./input";
import { getProductList, updateProduct } from "@/apis/services/product.service";
import { toast } from "react-toastify";
import { updateProductSchema } from "@/validation/updateModal.validation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface IModal {
  close: () => void;
  product: IProduct;
  onProductUpdated: () => void;
}

interface IModalValid {
  name: string;
  price: number;
  quantity: number;
  images: FileList;
}

export const UpdateModal: React.FC<IModal> = ({
  close,
  product,
  onProductUpdated,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IModalValid>({
    resolver: zodResolver(updateProductSchema),
    mode: "all",
    defaultValues: {
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    },
  });

  const onSubmit = async (data: IModalValid) => {
    const updatedProduct: Partial<IProduct> = {
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      images: data.images ? Array.from(data.images) : undefined,
    };

    try {
      await updateProduct(product._id, updatedProduct);
      onProductUpdated();
      close();
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message || "Failed to update product");
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
        <div className="flex min-h-full items-end justify-center p-4 sm:items-center">
          <div className="relative transform rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg mx-4">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start flex items-start gap-y-4">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-200 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col justify-center gap-4">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    ویرایش کالا/افزودن
                  </h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-4">
                      <Controller
                        control={control}
                        name="images"
                        render={({ field }) => (
                          <Input
                            type="file"
                            placeholder="تصویر کالا"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (e.target.files) {
                                field.onChange(e.target.files);
                              }
                            }}
                            error={errors.images?.message}
                          />
                        )}
                      />
                    </div>
                    <div className="p-4">
                      <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                          <Input
                            label="نام كالا"
                            placeholder="نام کالا"
                            {...field}
                            error={errors.name?.message}
                          />
                        )}
                      />
                    </div>
                    <div className="p-4">
                      <Controller
                        control={control}
                        name="price"
                        render={({ field }) => (
                          <Input
                            label="قيمت كالا"
                            type="number"
                            placeholder="قيمت کالا"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(Number(e.target.value)) }
                            value={field.value}
                            error={errors.price?.message}
                          />
                        )}
                      />
                    </div>
                    <div className="p-4">
                      <Controller
                        control={control}
                        name="quantity"
                        render={({ field }) => (
                          <Input
                            label="تعداد كالا"
                            type="number"
                            placeholder="تعداد کالا"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(Number(e.target.value)) }
                            value={field.value}
                            error={errors.quantity?.message}
                          />
                        )}
                      />
                    </div>
                    <div className="w-full px-4 py-3 gap-4 sm:flex justify-center items-center sm:px-6">
                      <button
                        type="submit"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-green-700 px-20 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-800 sm:mt-0 sm:w-auto"
                      >
                        تایید
                      </button>
                      <button
                        type="button"
                        onClick={close}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-500 px-20 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-600 sm:mt-0 sm:w-auto"
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
