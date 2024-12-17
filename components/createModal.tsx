"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./input";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "@/validation/createProduct.validation";
import { createProduct } from "@/apis/services/product.service";
import { getCategoryList } from "@/apis/services/category.service";
import {
  getSubCategoryById,
  getSubCategoryList,
} from "@/apis/services/subCategory.service";

interface IModal {
  close: () => void;
  onProductCreated: () => void;
}

interface ICreateModal {
  name: string;
  description: string;
  category: string;
  subCategory: string;
  brand: string;
  price: number;
  quantity: number;
  images?: File[];
}

export const CreateModal: React.FC<IModal> = ({ close, onProductCreated }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { subCategories } = await getSubCategoryList();
        setSubCategories(subCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateModal>({
    resolver: zodResolver(createProductSchema),
    mode: "all",
    defaultValues: {
      name: "",
      description: "",
      category: "",
      subCategory: "",
      brand: "ثبت نشده",
      price: 0,
      quantity: 0,
    },
  });
  const onSubmit = async (data: ICreateModal) => {
    console.log('catttt',data.category);
    console.log('catttt',data.subCategory);
    
    const newProduct = {
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      images: data.images ? Array.from(data.images) : undefined,
      category: data.category,
      subcategory: data.subCategory,
      brand: data.brand,
    };
    try {
      await createProduct(newProduct);
      onProductCreated();
      close();
    } catch (error: any) {
      toast.error(error.message || "کالا اضافه نشد");
      console.error("Failed to create product:", error);
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
      <div className="fixed pt-2 inset-0 z-10 w-screen ">
        <div className="flex items-end justify-center p-4 sm:items-center">
          <div
            dir="ltr"
            className="relative transform rounded-lg h-[80vh] overflow-y-auto overflow-x-hidden bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg mx-4"
          >
            <div
              dir="rtl"
              className="bg-white rounded-xl px-8 pb-4 pt-5 sm:p-1 sm:py-6 sm:pb-4"
            >
              <div className="sm:flex sm:items-start flex items-start justify-center gap-2">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-200 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-green-600"
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
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                </div>
                <div className="flex flex-col justify-center gap-4">
                  <h3
                    className="text-base pt-2 font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    افزودن محصول جدید
                  </h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="px-8 py-3">
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
                    <div className="px-8 py-3">
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
                    <div className="px-8 py-3">
                      <Controller
                        control={control}
                        name="price"
                        render={({ field }) => (
                          <Input
                            label="قيمت كالا"
                            type="number"
                            placeholder="قيمت کالا"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => field.onChange(Number(e.target.value))}
                            value={field.value}
                            error={errors.price?.message}
                          />
                        )}
                      />
                    </div>
                    <div className="px-8 py-3">
                      <Controller
                        control={control}
                        name="quantity"
                        render={({ field }) => (
                          <Input
                            label="تعداد كالا"
                            type="number"
                            placeholder="تعداد کالا"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => field.onChange(Number(e.target.value))}
                            value={field.value}
                            error={errors.quantity?.message}
                          />
                        )}
                      />
                    </div>
                    <div className="px-8 py-3">
                      <Controller
                        control={control}
                        name="description"
                        render={({ field }) => (
                          <Input
                            label="توضیحات كالا"
                            placeholder="توضیحات کالا"
                            {...field}
                            error={errors.name?.message}
                          />
                        )}
                      />
                    </div>
                    <div className="px-8 py-3">
                      <Controller
                        control={control}
                        name="brand"
                        render={({ field }) => (
                          <Input
                            label="برند كالا"
                            placeholder="برند کالا"
                            {...field}
                            error={errors.name?.message}
                          />
                        )}
                      />
                    </div>
                    <div className="px-8 py-3 flex flex-col gap-2">
                      <label className="text-slate-700">دسته بندی</label>

                      <Controller
                        control={control}
                        name="category"
                        render={({ field }) => (
                          <select
                            {...field}
                            name="category"
                            id="category"
                            className="border border-slate-300 bg-slate-50 rounded-lg md:max-w-[40vw] w-full px-3 py-1.5 text-sm shadow-md"
                          >
                            <option value="">انتخاب كنيد...</option>
                            <option value="674f5e9bd4ce8b2f706d402b">
                              گردنبند و آويز
                            </option>
                            <option value="674f605dd4ce8b2f706d402c">
                              انگشتر
                            </option>
                            <option value="674f60ced4ce8b2f706d402e">
                              ست و نيم ست
                            </option>
                            <option value="674f6113d4ce8b2f706d402f">
                              دستبند
                            </option>
                            <option value="674f614cd4ce8b2f706d4030">
                              گوشواره
                            </option>
                          </select>
                        )}
                      />
                    </div>
                    <div className="px-8 py-3 flex flex-col gap-2">
                      <label className="text-slate-700">زير دسته </label>
                      <Controller
                        control={control}
                        name="subCategory"
                        render={({ field }) => (
                          <select
                            {...field}
                            name="subCategory"
                            id="subCategory"
                            className="border border-slate-300 bg-slate-50 rounded-lg md:max-w-[40vw] w-full px-3 py-1.5 text-sm shadow-md"
                          >
                            <option value="">انتخاب كنيد...</option>
                            <option value="67473eac6d7d32d8385eb325">
                              مدال و پلاك
                            </option>
                            <option value="674f63a0d4ce8b2f706d4035">
                              گردبند رولباسي
                            </option>
                            <option value="674f651cd4ce8b2f706d403a">
                              انگشتر زنانه
                            </option>
                            <option value="674f657ad4ce8b2f706d403b">
                              حلقه ازدواج
                            </option>
                            <option value="674f6763d4ce8b2f706d4046">
                              دستبند زنجيري
                            </option>
                            <option value="674f67acd4ce8b2f706d4047">
                              دستبند بنگل
                            </option>
                            <option value="674f66bcd4ce8b2f706d4042">
                              نيم ست
                            </option>
                            <option value="674f6637d4ce8b2f706d403f">
                              سرویس کامل
                            </option>
                            <option value="674f68fbd4ce8b2f706d404c">
                              گوشواره آویز
                            </option>
                            <option value="674f68b0d4ce8b2f706d404b">
                              گوشواره ميخي
                            </option>
                          </select>
                        )}
                      />
                    </div>
                    <div className="w-full px-8 py-3 mt-6 gap-4 sm:flex justify-center items-center sm:px-8">
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
