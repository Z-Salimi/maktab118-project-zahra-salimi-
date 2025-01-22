'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { clearCart, getCart, removeFromCart } from '@/apis/services/cart.service';

export const CartDropdown: React.FC = () => {
  const [items, setItems] = useState<ICart[]>([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if(userId){
          const cart = await getCart(userId);
          setItems(cart.cart?.products || []);
          
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [userId,items]);

  const handleRemoveFromCart = async (productId: string) => {
    try {
      if(userId){
        const updatedCart = await removeFromCart(userId, productId);
        setItems(updatedCart.cart?.products || []);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      if(userId){
        const updatedCart = await clearCart(userId);
        setItems(updatedCart.cart?.products || []);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <div className="bg-slate-100 border border-gray-200 rounded-lg shadow-md absolute top-12 left-8 w-64 p-2 z-50">
      <ul className="p-2">
        {items.map((item) => (

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
            >
              حذف
            </button>
          </li>
        ))}
      </ul>
      <div className='grid grid-cols-2 justify-center items-center gap-3'>
        <Link href="/products/cart">
          <button className="bg-green-600 w-full text-xs rounded-lg text-white py-2 px-4">
            سبد خرید
          </button>
        </Link>
        <button 
          onClick={handleClearCart} 
          disabled={items.length === 0}
          className={`bg-red-700 text-white text-xs px-2 py-2 rounded-lg w-full ${items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          حذف همه
        </button>
      </div>
    </div>
  );
};