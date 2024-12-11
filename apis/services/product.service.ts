import axios from 'axios';
import { urls } from '../urls';

interface IAllProducts {
  products: IProduct[];
  total: number;
}

export const getProductList = async (page = 1, limit = 10): Promise<IAllProducts> => {
  try {
    const response = await axios.get<IResDto>(urls.products, {
      params: { page, limit },
    });
    console.log('Response:', response.data);
    console.log('Total products:', response.data.total);
    const products = response.data.data.products;
    const total = response.data.total;
    return { products, total };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching products:', error.response?.data);
    } else {
      console.error('Unknown error:', error);
    }
    throw new Error('Failed to fetch products');
  }
};

export const updateProduct = async (productId: string, updatedProduct: IProduct) => {
  try {
    const formData = new FormData();
    formData.append('name', updatedProduct.name);
    formData.append('category', updatedProduct.category);
    if (updatedProduct.images) {
      formData.append('images', updatedProduct.images[0]);
    }

    const response = await fetch(`https://api.example.com/products/${productId}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

