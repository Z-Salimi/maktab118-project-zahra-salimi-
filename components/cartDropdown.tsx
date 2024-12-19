'use client'
import React from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { RootState } from '@/Redux/store';
import { removeFromCart } from '@/Redux/slices/cartSlice';

export const CartDropdown: React.FC = () => {
  const items = useAppSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();

  return (
    <div className=" bg-slate-100 border border-gray-200 rounded-lg shadow-md absolute top-12 left-8 w-64 p-2">
      <ul className="p-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-around gap-2 py-2">
            <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded-full" />
            <div className="flex items-end justify-center gap-2">
              <span className=" font-medium text-xs">{item.name}</span>
              <span className=" text-gray-600 text-xs flex justify-center items-center">({item.quantity} عدد)</span>
            </div>
            <button onClick={() => dispatch(removeFromCart({ id: item.id }))} className='bg-red-600 text-white text-xs px-2 py-1 rounded-xl'>حذف</button>
          </li>
        ))}
      </ul>
      <Link href="/products/cart">
        <button className="block w-full bg-green-600 rounded-lg text-white py-2 mt-2">سبد خرید</button>
      </Link>
    </div>
  );
};
