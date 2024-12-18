import axios from 'axios';
import { urls } from '../urls';
import { toast } from 'react-toastify';
import { getToken } from '@/utils/session.managment';

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
    
    formData.append('price', `${updatedProduct.price || ''}`);
    formData.append('quantity', `${updatedProduct.quantity || ''}`);

    if (updatedProduct.images) {
      formData.append('images', updatedProduct.images[0]); 
    }

    const response = await axios.patch(`http://localhost:8000/api/products/${productId}`, formData);

    toast.success('ويرايش موفقيت آميز بود')
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // toast.error(error.message);
      console.log(error.message);
      
    } else {
      console.error('Unknown error:', error);
    }
    throw new Error('Failed to update product');
  }
};
export const updateProductStock = async (productId: string, updatedProduct: Partial<IProduct>) => {
  try {
    const formData = new FormData();
    
    formData.append('price', `${updatedProduct.price || ''}`);
    formData.append('quantity', `${updatedProduct.quantity || ''}`);


    const response = await axios.patch(`http://localhost:8000/api/products/${productId}`, formData);

    toast.success('ويرايش موفقيت آميز بود')
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // toast.error(error.message);
      console.log(error.message);
      
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
    toast.success('حذف موفقيت آميز بود')
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


interface ICreateProduct {
  name: string;
  description: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  quantity: number;
  images?: File[];
}

export const createProduct = async (newProduct: Partial<ICreateProduct>) => {
  const token = getToken();
  try {
    const formData = new FormData();
    console.log('newwww', newProduct.subcategory);
    
    formData.append('name',`${newProduct.name || ''}`);
    formData.append('description', `${newProduct.description || ''}`);
    formData.append('category', `${newProduct.category || ''}`);
    formData.append('subcategory', `${newProduct.subcategory || ''}`);
    formData.append('brand', `${newProduct.brand || ''}`);
    formData.append('price', `${newProduct.price || 0}`);
    formData.append('quantity', `${newProduct.quantity || 0}`);
    
    if (newProduct.images && newProduct.images.length > 0) {
      for (const image of newProduct.images) {
        formData.append('images', image);
      }
    }
    console.log('formmm', formData);

    const response = await axios.post('http://localhost:8000/api/products', formData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    });

    toast.success('کالا با موفقیت اضافه شد');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.message);
      console.error('Error creating product:', error.response?.data);
    } else {
      toast.error('An unexpected error occurred');
      console.error('Unknown error:', error);
    }
    throw new Error('Failed to create product');
  }
};

