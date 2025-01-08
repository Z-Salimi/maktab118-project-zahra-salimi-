<<<<<<< HEAD
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCart, removeFromCart } from '@/apis/services/cart.service';
import { ProductCard } from './productCard';
import { Button } from './button';
=======
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  clearCart,
  getCart,
} from "@/apis/services/cart.service";
import { ProductCard } from "./productCard";
import { Button } from "./button";
>>>>>>> 0.6.1

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string[];
}

interface Cart {
  items: CartItem[];
}

const useUserId = (): string | null => {
  return localStorage.getItem('userId');
};

export const CartComponent: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [cart, setCart] = useState<Cart>({ items: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  
  const calculateTotalPrice = (items: CartItem[]): number => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      setUserId(id);
    }
  }, []);

<<<<<<< HEAD
  useEffect(() => {
    const fetchCart = async () => {
      if (userId) {
        try {
          setLoading(true);
          const response = await getCart(userId);
          const cartData = response.data?.cart?.products?.map((item: any) => ({
            productId: item.product._id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
            image: item.product.image,
          })) || [];
=======
  const fetchCart = async () => {
    if (userId) {
      try {
        setLoading(true);
        const response = await getCart(userId);

        const cartData = response?.cart?.products?.map((item: any) => ({
          productId: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.images[0],
        })) || [];
>>>>>>> 0.6.1

        setCart({ items: cartData });
        setTotalPrice(calculateTotalPrice(cartData));
      } catch (err) {
        setError("Error fetching cart");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const handleRemoveFromCart = async (productId: string) => {
    if (userId) {
      try {
        const updatedCart = await removeFromCart(userId, productId);
        setCart({ items: updatedCart.items || [] });
      } catch (err) {
        console.error('Error removing item from cart', err);
      }
    }
  };

  const handleClearCart = async () => {
<<<<<<< HEAD
    if (userId) {
      try {
        setCart({ items: [] });
        localStorage.setItem("cartItems", JSON.stringify([]));
      } catch (err) {
        console.error('Error clearing cart', err);
=======
    try {
      if (userId) {
        const updatedCart = await clearCart(userId);
        const clearedCart: Cart = { items: [] };
        setCart(updatedCart.cart?.products || clearedCart);
        setTotalPrice(0);
>>>>>>> 0.6.1
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>{error}</div>;

<<<<<<< HEAD
  const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

=======
>>>>>>> 0.6.1
  return (
    <section className="flex flex-col justify-center items-center gap-4">
      {cart.items.length === 0 ? (
        <p className="text-gray-50 bg-orange-500 p-4 rounded-full">
          سبد خرید شما خالی است
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cart.items.map((item) => (
              <ProductCard
                key={item.productId}
                id={item.productId}
                name={item.name}
                price={item.price}
                image={`http://localhost:8000/images/products/images/${item.image}`}
<<<<<<< HEAD
                userId={userId}
                onRemove={() => handleRemoveFromCart(item.productId)}
=======
                userId={userId!}
                onQuantityChange={fetchCart}
>>>>>>> 0.6.1
              />
            ))}
          </div>
          <div className="mt-14 flex flex-col md:flex-row justify-center items-center gap-8">
            <p className="text-xl text-gray-700 font-bold border-2 border-gray-400 p-3 rounded-full">
              قیمت نهایی: {totalPrice} تومان
            </p>
            <Link href={"/products/cart/contact"}>
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


