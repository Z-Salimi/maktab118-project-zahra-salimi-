
interface IProductCard{
    title:string;
    price:number;
    src: string;
   }
   export const ProductCard: React.FC<IProductCard> = ({title,price,src}) => {
     return (
       <div className="flex flex-col gap-3 bg-slate-200 border-2 border-gray-400 rounded-xl p-4 w-[30vw] h-[40vh]">
         <img src={src} alt="" className="size-56 rounded-xl" />
         <h3 className="text-gray-600 text-lg font-semibold text-start px-4">
           {title}
         </h3>
         <p className="text-gray-500 font-medium px-4">{price} تومان</p>
       </div>
     );
   };
   