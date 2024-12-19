import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/Redux/slices/cartSlice";
import Link from "next/link";
import { RootState } from "@/Redux/store";

interface IProductCard {
  name: string;
  price: number;
  image: string;
  id: string;
}

export const ProductCard: React.FC<IProductCard> = ({
  name,
  price,
  image,
  id,
}) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === id);

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price, image }));
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity({ id }));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity({ id }));
  };

  return (
    <div className="flex flex-col items-center gap-3 bg-slate-200 border-2 border-gray-400 rounded-xl p-4 w-64 h-80">
      <div>
        <Link href={`/products/${id}`}>
          <img src={image} alt={name} className="rounded-xl w-52" />
        </Link>
      </div>
      <h3 className="text-gray-600 text-lg font-semibold text-start px-4">
        {name}
      </h3>
      <p className="text-gray-500 font-medium px-4">{price} تومان</p>
      <div className="flex justify-center items-end h-full">
        {cartItem && cartItem.quantity > 0 ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleIncrease}
              className="bg-slate-600 text-gray-100 py-1 px-4 rounded-r-lg shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray]"
            >
              +
            </button>
            <span className="mx-2">{cartItem.quantity}</span>
            <button
              onClick={handleDecrease}
              className="bg-slate-600 text-gray-100 py-1 px-4 rounded-l-lg shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray]"
            >
              -
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-gray-100 py-1 p-4 rounded-xl shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray]"
          >
            افزودن به سبد خرید
          </button>
        )}
      </div>
    </div>
  );
};
