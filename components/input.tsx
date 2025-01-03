import { classNames } from "@/utils/className";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full flex flex-col justify-center gap-2">
      <label className="text-slate-700">{label}</label>
      <input
        className={
          (classNames
            ("border border-slate-300 bg-slate-50 rounded-lg md:max-w-[40vw] w-full px-3 py-1.5 text-sm shadow-md",
            className))
        }
        {...props}
      />
      {error && <p className="text-red-700 text-sm font-medium">{error}</p>}
    </div>
  );
};
