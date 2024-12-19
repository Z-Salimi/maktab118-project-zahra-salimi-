"use client";
import { ProductPage } from "@/components/productPage";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { useParams} from "next/navigation";

export const ProductById: React.FC = () => {
  const currentPage = 1;
  const productsPerPage = 88;
  const path = useParams();

  const { data, error, isLoading } = useFetchProducts(
    currentPage,
    productsPerPage
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <section className="w-full py-6 flex flex-col justify-center  items-center gap-4">
      {data?.products
        .filter((product) => product._id === path.id)
        .map((product) => (
          <ProductPage
          key={product._id}
            image={`http://localhost:8000/images/products/images/${product.images[0]}`}
            name={product.name}
            description={product.description}
            quantity={product.quantity}
            price={product.price}
            brand={product.brand}
            id={product._id}
          />
        ))}
    </section>
  );
};
