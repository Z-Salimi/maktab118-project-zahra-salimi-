
import React, { useState } from "react";
import { FaAngleDown, FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
import { CartDropdown } from "./cartDropdown";

interface CartIconProps {
  cartItemsCount: number;
}

export const CartIcon: React.FC<CartIconProps> = ({ cartItemsCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="items-center md:flex border-2 border-gray-400 rounded-full p-2 shadow-xl relative">
      <div className="flex items-center gap-2">
        <FaAngleDown onClick={toggleCart} className="ml-2 cursor-pointer" />
        {cartItemsCount > 0 && <span className="text-xs">{cartItemsCount}</span>}
        <Link href={"/products/cart"}>
          <FaCartShopping className="size-6 text-gray-600" onClick={toggleCart} />
        </Link>
        {isOpen && <CartDropdown />}
      </div>
    </div>
  );
};
