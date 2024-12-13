import React from "react";

interface IBeneficCard{
    text: string;
    src: string;
}
export const BenefitCard: React.FC<IBeneficCard> = ({text,src}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex justify-center items-center rounded-full w-40 h-40 border-white border-4 bg-slate-200 shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray]">
        <img src={src} alt="" />
      </div>
      <h4 className="text-gray-500 text-lg font-semibold">{text}</h4>
    </div>
  );
};
