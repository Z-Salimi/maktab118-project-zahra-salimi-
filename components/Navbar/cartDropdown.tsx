'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCart, removeFromCart } from '@/apis/services/cart.service';

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export const CartDropdown: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const userId = localStorage.getItem('userId');  // Replace with actual user ID retrieval logic

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cart = await getCart(userId);
        setItems(cart.items || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleRemoveFromCart = async (productId: string) => {
    try {
      const updatedCart = await removeFromCart(userId, productId);
      setItems(updatedCart.items || []);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleClearCart = () => {
    setItems([]);
    // Optionally, you can also implement a backend call to clear the cart on the server
  };

  return (
    <div className="bg-slate-100 border border-gray-200 rounded-lg shadow-md absolute top-12 left-8 w-64 p-2">
      <ul className="p-2">
        {items.map((item) => (
          <li key={item.productId} className="flex items-center justify-around gap-2 py-2">
            <img src={`http://localhost:8000/images/products/images/${item.image}`} alt={item.name} className="w-8 h-8 object-cover rounded-full" />
            <div className="flex items-end justify-center gap-2">
              <span className="font-medium text-xs">{item.name}</span>
              <span className="text-gray-600 text-xs flex justify-center items-center">({item.quantity} عدد)</span>
            </div>
            <button 
              onClick={() => handleRemoveFromCart(item.productId)} 
              className='bg-red-600 text-white text-xs px-2 py-1 rounded-xl'
              title='حذف'  // Adding title attribute for accessibility
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
