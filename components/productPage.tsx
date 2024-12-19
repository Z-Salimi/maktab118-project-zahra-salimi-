"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { Button } from "./button";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "@/Redux/slices/cartSlice";
import { RootState } from "@/Redux/store";

interface IProductPage {
  image: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  brand: string;
  id: string;
}
export const ProductPage: React.FC<IProductPage> = ({
  image,
  name,
  price,
  quantity,
  description,
  brand,
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
    <section className="w-full px-24 py-6 flex flex-col justify-center gap-4  overflow-x-hidden">
      <div className="w-[80vw] border-8 border-slate-400 rounded-xl flex justify-center items-center mb-6 shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray]">
        <img
          src={image}
          alt=""
        />
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 text-3xl font-bold text-start px-4">
          {name}
        </h2>
        <div className="flex justify-center items-end h-full">
          {cartItem && cartItem.quantity > 0 ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleIncrease}
                className="bg-green-600 text-gray-100 py-1 px-4 rounded-r-lg shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray]"
              >
                +
              </button>
              <span className="mx-2">{cartItem.quantity}</span>
              <button
                onClick={handleDecrease}
                className="bg-red-600 text-gray-100 py-1 px-4 rounded-l-lg shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray]"
              >
                -
              </button>
            </div>
          ) : (
            <Button
              onClick={handleAddToCart}
              text="افزودن به سبد خرید"
              className="bg-green-700 text-white font-semibold "
            />
          )}
        </div>
      </div>
      <h4 className="text-gray-600 text-lg font-semibold text-start px-4">
        توضیحات:
      </h4>
      <div className="text-gray-500 text-lg font-medium text-start px-4">
        {description}
      </div>
      <div className="text-gray-600 text-lg font-medium text-start px-4">
        <span className="text-gray-600 text-lg font-semibold text-start">
          برند:
        </span>
        {brand}
      </div>
      <div className="text-gray-600 text-lg font-medium text-start px-4">
        <span className="text-gray-600 text-lg font-semibold text-start">
          تعداد:
        </span>
        {quantity}
      </div>
      <h4 className="text-gray-600 text-lg font-semibold text-start px-4">
        قیمت:
      </h4>
      <div className="text-gray-500 text-lg font-medium text-start px-4">
        {price} تومان
      </div>
    </section>
  );
};
