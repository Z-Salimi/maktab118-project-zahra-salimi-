'use client'
import { useFetchProducts } from '@/hooks/useFetchProducts';
import React from 'react';
import { ProductCard } from './productCard';
import Link from 'next/link';

interface ICategoryFetch{
    id:string;
}
export const CategoryFetch: React.FC<ICategoryFetch> = ({id}) => {
    const currentPage = 1;
    const productsPerPage = 88;
  
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
  
    const categories = [
      {
        name: "گردنبند و آویز",
        id: "674f5e9bd4ce8b2f706d402b",
        link: "/categories/necklace",
      },
      {
        name: "انگشتر",
        id: "674f605dd4ce8b2f706d402c",
        link: "/categories/ring",
      },
      {
        name: "ست و نیم ست",
        id: "674f60ced4ce8b2f706d402e",
        link: "/categories/set",
      },
      {
        name: "دستبند",
        id: "674f6113d4ce8b2f706d402f",
        link: "/categories/bracelet",
      },
      {
        name: "گوشواره",
        id: "674f614cd4ce8b2f706d4030",
        link: "/categories/earring",
      },
    ];
  
    return (
      <section className="px-20 py-1 flex flex-col gap-20">
        {categories.filter((category)=> category.id === id).map((category) => (
          <div
            key={category.id}
            className="flex flex-col  gap-4"
          >
            <h2 className="font-semibold text-2xl text-gray-700 pt-10">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-4">
              {data?.products
                .filter((product) => product.category === category.id)
                .map((product) => (
                  <ProductCard
                    key={product._id}
                    productId={product._id}
                    title={product.name}
                    price={product.price}
                    src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                  />
                ))}
              
            </div>
          </div>
        ))}
      </section>
    );
};
