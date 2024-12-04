import React from "react";

interface IButton {
  className?: string;
  text: string;
}
export const Button: React.FC<IButton> = ({ className, text }) => {
  return (
    <button
      className={`bg-gray-100 px-6 py-1 rounded-xl text-gray-600 font-semibold border-r-2 border-b-2 border-gray-100 shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray] ${className}`}
    >
      {text}
    </button>
  );
};
