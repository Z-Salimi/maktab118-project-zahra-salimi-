"use client";
import React from "react";
import { useAppSelector } from "@/Redux/hooks";
import { RootState } from "@/Redux/store";
import { ProductCard } from "@/components/productCard";
import { Button } from "@/components/button";
import Link from "next/link";

export const CartPageContainer: React.FC = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <section className="flex flex-col justify-center items-center gap-4">
      {cartItems.length === 0 ? (
        <p className="text-gray-50 bg-orange-500 p-4 rounded-full">سبد خرید شما خالی است</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartItems.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
          <div className=" mt-14 flex justify-center items-center gap-8">
            <p className="text-xl text-gray-700 font-bold border-2 border-gray-400 p-3 rounded-full">قیمت نهایی: {totalPrice} تومان</p>
            <Link href={'/products/cart/payment'}><Button text="نهایی کردن خرید"  className="px-4 py-3 bg-green-700 text-white"/></Link>
          </div>
        </>
      )}
    </section>
  );
};
