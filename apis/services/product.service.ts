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

export const updateProduct = async (productId: string, updatedProduct: Partial<IProduct>) => {
  try {
    const formData = new FormData();
    formData.append('name', `${updatedProduct.name || ''}`);
    
    // Adding price and quantity fields to FormData
    formData.append('price', `${updatedProduct.price || ''}`);
    formData.append('quantity', `${updatedProduct.quantity || ''}`);

    if (updatedProduct.images && updatedProduct.images.length > 0) {
      formData.append('images', updatedProduct.images[0]); // Assuming single image upload
    }

    const response = await axios.patch(`http://localhost:8000/api/products/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error updating product:', error.response?.data);
      console.error('Status code:', error.response?.status);
      console.error('Headers:', error.response?.headers);
    } else {
      console.error('Unknown error:', error);
    }
    throw new Error('Failed to update product');
  }
};


export const deleteProduct = async (productId: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/products/${productId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error deleting product:", error.response?.data);
    } else {
      console.error("Unknown error:", error);
    }
    throw new Error("Failed to delete product");
  }
};
