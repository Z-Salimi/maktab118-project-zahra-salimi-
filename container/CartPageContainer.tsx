"use client";
import React, { useState, useEffect } from "react";
import { ProductCard } from "@/components/productCard";
import { Button } from "@/components/button";
import Link from "next/link";
import { useAddToCart, useCart, useRemoveFromCart } from "@/hooks/useCart";

export const CartPageContainer: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      setUserId(id);
    }
  }, []);

  const { data: cart, error, isLoading } = useCart(userId!);
  const addMutation = useAddToCart(userId!);
  const removeMutation = useRemoveFromCart(userId!);

  if (isLoading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (error) {
    return <div>خطا در دریافت اطلاعات سبد خرید</div>;
  }

  const totalPrice = cart?.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleClearCart = () => {
    cart?.items.forEach(item => {
      removeMutation.mutate({ userId: userId!, productId: item.productId });
    });
  };

  return (
    <section className="flex flex-col justify-center items-center gap-4">
      {cart?.items.length === 0 ? (
        <p className="text-gray-50 bg-orange-500 p-4 rounded-full">
          سبد خرید شما خالی است
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cart?.items.map((item) => (
              <ProductCard
                key={item.productId}
                id={item.productId}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
          <div className=" mt-14 flex flex-col md:flex-row justify-center items-center gap-8">
            <p className="text-xl text-gray-700 font-bold border-2 border-gray-400 p-3 rounded-full">
              قیمت نهایی: {totalPrice} تومان
            </p>
            <Link href={"/products/cart/payment"}>
              <Button
                text="نهایی کردن خرید"
                className="px-4 py-3 bg-green-700 text-white"
              />
            </Link>
            <Button
              text="حذف همه"
              className="px-2 py-3 bg-red-700 text-white"
              onClick={handleClearCart}
            />
          </div>
        </>
      )}
    </section>
  );
};
