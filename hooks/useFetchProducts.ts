import { getCategoryById } from "@/apis/services/category.service";
import { getProductList } from "@/apis/services/product.service";
import { getSubCategoryById } from "@/apis/services/subCategory.service";
import { useQuery } from "@tanstack/react-query";

const fetchProductData = async (page: number, limit: number) => {
    const data = await getProductList(page, limit);
    console.log("data fetch ", data.products);
    
    const categoryPromises = data.products.map(product => getCategoryById(product.category));
    const subCategoryPromises = data.products.map(product => getSubCategoryById(product.subcategory));
    
    const categoryResults = await Promise.all(categoryPromises);
    const subCategoryResults = await Promise.all(subCategoryPromises);
    
    const categoryNames: Record<string, string> = {};
    const subCategoryNames: Record<string, string> = {};
    
    categoryResults.forEach((categoryData, index) => {
      categoryNames[data.products[index].category] = categoryData.category.name;
    });
    
    subCategoryResults.forEach((subCategoryData, index) => {
      subCategoryNames[data.products[index].subcategory] = subCategoryData.subcategory.name;
    });
    
    return { products: data.products, categories: categoryNames, subCategories: subCategoryNames, total: data.total };
  };
  

export const useFetchProducts = (page: number, limit: number) => {
 
  const query= useQuery({
    queryKey: ['products', page],
    queryFn: () => fetchProductData(page, limit)
})
return query;
};
