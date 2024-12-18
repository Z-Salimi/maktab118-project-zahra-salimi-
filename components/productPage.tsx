import { Button } from "./button";

interface IProductPage {
  image: string;
  title: string;
  price: number;
  quantity: number;
  description: string;
  brand: string;
}
export const ProductPage: React.FC<IProductPage> = ({
  image,
  title,
  price,
  quantity,
  description,
  brand,
}) => {
  return (
    <section className="w-full px-24 py-6 flex flex-col justify-center gap-4  overflow-x-hidden">
      <div className="w-[80vw] border-8 border-slate-400 rounded-xl flex justify-center items-center mb-6 shadow-[4px_4px_5px_lightgray] transition-all ease-in-out duration-500 hover:shadow-[-4px_-4px_5px_lightgray]">
        <img
          src={`http://localhost:8000/images/products/images/${image}`}
          alt=""
        />
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 text-3xl font-bold text-start px-4">
          {title}
        </h2>
        <Button text="افزودن به سبد خرید" className="bg-green-700 text-white font-semibold " />
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
        </span>{" "}
        {brand}
      </div>
      <div className="text-gray-600 text-lg font-medium text-start px-4">
        <span className="text-gray-600 text-lg font-semibold text-start">
          تعداد:
        </span>{" "}
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
