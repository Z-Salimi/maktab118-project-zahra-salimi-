import Link from "next/link";

interface IProductCard {
  title: string;
  price: number;
  src: string;
  productId: string;
}
export const ProductCard: React.FC<IProductCard> = ({
  title,
  price,
  src,
  productId,
}) => {
  return (
    <Link href={`/products/${productId}`}>
      <div className="flex flex-col justify-center items-center gap-3 bg-slate-200 border-2 border-gray-400 rounded-xl p-4 w-fit h-72">
        <div className="size-60">
          <img src={src} alt="" className="rounded-xl" />
        </div>
        <h3 className="text-gray-600 text-lg font-semibold text-start px-4">
          {title}
        </h3>
        <p className="text-gray-500 font-medium px-4">{price} تومان</p>
      </div>
    </Link>
  );
};
