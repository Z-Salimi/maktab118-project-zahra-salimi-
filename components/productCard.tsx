import React, { useState, useEffect } from "react";
import Link from "next/link";
import { addToCart, removeFromCart, getCart } from '@/apis/services/cart.service'; // Import your services

interface IProductCard {
  name: string;
  price: number;
  image: string;
  id: string;
  userId: string;
}

export const ProductCard: React.FC<IProductCard> = ({
  name,
  price,
  image,
  id,
  userId,
}) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [cart, setCart] = useState<any>({ items: [] });

  useEffect(() => {
    const fetchCart = async () => {
      if (userId) {
        try {
          const response = await getCart(userId);
          const cartData = response.data?.cart?.products?.map((item: any) => ({
            productId: item.product._id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
            image: item.product.image,
          })) || [];
          setCart({ items: cartData });

          const cartItem = cartData.find((item: any) => item.productId === id);
          if (cartItem) {
            setQuantity(cartItem.quantity);
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
    };
    fetchCart();
  }, [userId, id, cart]);

  const handleAddToCart = async () => {
    if (userId) {
      try {
        const updatedCart = await addToCart(userId, id, 1);
        const updatedCartData = updatedCart.data?.cart?.products?.map((item: any) => ({
          productId: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.image,
        })) || [];
        setCart({ items: updatedCartData });

        const cartItem = updatedCartData.find((item: any) => item.productId === id);
        if (cartItem) {
          setQuantity(cartItem.quantity);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const handleIncrease = async () => {
    if (userId) {
      try {
        const updatedCart = await addToCart(userId, id, 1);
        const updatedCartData = updatedCart.data?.cart?.products?.map((item: any) => ({
          productId: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.image,
        })) || [];
        setCart({ items: updatedCartData });

        const cartItem = updatedCartData.find((item: any) => item.productId === id);
        if (cartItem) {
          setQuantity(cartItem.quantity);
        }
      } catch (error) {
        console.error("Error increasing quantity:", error);
      }
    }
  };

  const handleDecrease = async () => {
    if (userId) {
      if (quantity > 1) {
        try {
          const updatedCart = await addToCart(userId, id, -1);
          const updatedCartData = updatedCart.data?.cart?.products?.map((item: any) => ({
            productId: item.product._id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
            image: item.product.image,
          })) || [];
          setCart({ items: updatedCartData });

          const cartItem = updatedCartData.find((item: any) => item.productId === id);
          if (cartItem) {
            setQuantity(cartItem.quantity);
          }
        } catch (error) {
          console.error("Error decreasing quantity:", error);
        }
      } else {
        try {
          const updatedCart = await removeFromCart(userId, id);
          const updatedCartData = updatedCart.data?.cart?.products?.map((item: any) => ({
            productId: item.product._id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
            image: item.product.image,
          })) || [];
          setCart({ items: updatedCartData });
          setQuantity(0);
        } catch (error) {
          console.error("Error removing item from cart:", error);
        }
      }
    }
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
      <p className="text-gray-500 font-medium px-4 whitespace-nowrap">
        {price} تومان
      </p>
      <div className="flex justify-center items-end h-full">
        {quantity > 0 ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleIncrease}
              className="bg-slate-600 text-gray-100 py-1 px-4 rounded-r-lg shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray]"
            >
              +
            </button>
            <span className="mx-2">{quantity}</span>
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
            className="bg-green-600 text-gray-100 py-1 p-4 rounded-xl whitespace-nowrap shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray]"
          >
            افزودن به سبد خرید
          </button>
        )}
      </div>
    </div>
  );
};
