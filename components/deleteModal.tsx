'use client';
import React from "react";
import { Button } from "@/components/button";

interface IDeleteModal {
  close: () => void;
  productName: string;
  productImage: string;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<IDeleteModal> = ({ close, productName, productImage, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-800 bg-opacity-50 outline-none">
      <div className="relative w-auto mx-auto max-w-3xl">
        <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-xl font-semibold">
              تأیید حذف
            </h3>
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={close}
            >
              <span className="text-gray-700 opacity-7 h-6 w-6 text-xl bg-gray-200 flex items-center justify-center rounded-full">
                ×
              </span>
            </button>
          </div>
          <div className="relative p-6 flex flex-col justify-center items-center">
            <img src={`http://localhost:8000/images/products/images/${productImage}`}
            className="size-36 rounded-lg"
            alt="" />
            <p className="my-4 text-gray-600 text-lg leading-relaxed">
               آیا مطمئن هستید که می‌خواهید كالا " {productName} " را حذف کنید؟
            </p>
          </div>
          <div className="flex items-center justify-end gap-4 p-6 border-t border-solid border-gray-300 rounded-b">
            <Button text="لغو" className="bg-gray-300 hover:bg-gray-400" onClick={close} />
            <Button text="تأیید" className="bg-red-600 text-white hover:bg-red-700 ml-4" onClick={onConfirm} />
          </div>
        </div>
      </div>
    </div>
  );
};
