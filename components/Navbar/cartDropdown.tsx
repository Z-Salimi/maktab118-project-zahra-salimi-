<<<<<<< HEAD
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCart, removeFromCart, clearCart } from "@/apis/services/cart.service"; // Import clearCart

interface CartItem {
  product: {
    productId: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}
=======
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { clearCart, getCart, removeFromCart } from '@/apis/services/cart.service';
>>>>>>> 0.6.1

// Custom hook to retrieve user ID
const useUserId = (): string | null => {
  // Replace with actual user ID retrieval logic
  return localStorage.getItem("userId");
};

export const CartDropdown: React.FC = () => {
<<<<<<< HEAD
  const [items, setItems] = useState<CartItem[]>([]);
  const userId = useUserId();
=======
  const [items, setItems] = useState<ICart[]>([]);
  const userId = localStorage.getItem('userId');
>>>>>>> 0.6.1

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
<<<<<<< HEAD
        if (userId) {
          const cart = await getCart(userId);
          setItems(cart.data.cart.products || []);
=======
        if(userId){
          const cart = await getCart(userId);
          setItems(cart.cart?.products || []);
          
>>>>>>> 0.6.1
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        // Display user-friendly message
      }
    };

    fetchCartItems();
<<<<<<< HEAD
  }, [userId, items]);

  const handleRemoveFromCart = async (productId: string) => {
    try {
      if (userId) {
        const updatedCart = await removeFromCart(userId, productId);
        setItems(updatedCart.items || []);
=======
  }, [userId,items]);

  const handleRemoveFromCart = async (productId: string) => {
    try {
      if(userId){
        const updatedCart = await removeFromCart(userId, productId);
        setItems(updatedCart.cart?.products || []);
>>>>>>> 0.6.1
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      // Display user-friendly message
    }
  };

  const handleClearCart = async () => {
    try {
<<<<<<< HEAD
      if (userId) {
        await clearCart(userId); // Call clearCart function
        setItems([]); // Clear local state
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      // Display user-friendly message
=======
      if(userId){
        const updatedCart = await clearCart(userId);
        setItems(updatedCart.cart?.products || []);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
>>>>>>> 0.6.1
    }
  };

  return (
    <div className="bg-slate-100 border border-gray-200 rounded-lg shadow-md absolute top-12 left-8 w-64 p-2 z-50">
      <ul className="p-2">
        {items.map((item) => (
<<<<<<< HEAD
          <li
            key={item.product.productId}
            className="flex items-center justify-around gap-2 py-2"
          >
            <img
              src={`http://localhost:8000/images/products/${item.product.image}`}
              alt={item.product.name}
              className="w-8 h-8 object-cover rounded-full"
            />
            <div className="flex items-end justify-center gap-2">
              <span className="font-medium text-xs">{item.product.name}</span>
              <span className="text-gray-600 text-xs flex justify-center items-center">
                ({item.quantity} عدد)
              </span>
            </div>
            <button
              onClick={() => handleRemoveFromCart(item.product.productId)}
              className="bg-red-600 text-white text-xs px-2 py-1 rounded-xl"
              title="حذف"
=======

          <li key={item.product._id} className="flex items-center justify-around gap-2 py-2">
           <img src={`http://localhost:8000/images/products/images/${item.product.images[0]}`} alt={item.product.name} className="w-8 h-8 object-cover rounded-full" />
            <div className="flex items-end justify-center gap-2">
              <span className="font-medium text-xs">{item.product.name}</span>
              <span className="text-gray-600 text-xs flex justify-center items-center">({item.quantity} عدد)</span>
            </div>
            <button 
              onClick={() => handleRemoveFromCart(item.product._id)} 
              className='bg-red-600 text-white text-xs px-2 py-1 rounded-xl'
              title='حذف'
>>>>>>> 0.6.1
            >
              حذف
            </button>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-2 justify-center items-center gap-3">
        <Link href="/products/cart">
          <button className="bg-green-600 w-full text-xs rounded-lg text-white py-2 px-4">
            سبد خرید
          </button>
        </Link>
        <button
          onClick={handleClearCart}
          disabled={items.length === 0}
          className={`bg-red-700 text-white text-xs px-2 py-2 rounded-lg w-full ${
            items.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          حذف همه
        </button>
      </div>
    </div>
  );
};
