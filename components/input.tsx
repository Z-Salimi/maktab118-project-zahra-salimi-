import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div  className="w-full flex flex-col justify-center gap-2">
      <label className="text-slate-700 capitalize">{label}</label>
      <input  className="border border-slate-300 rounded-lg md:max-w-[40vw] w-full px-3 py-1.5 text-sm shadow-md" {...props} />
      {error && <p className="text-red-700 text-sm font-medium">{error}</p>}
    </div>
  );
};
