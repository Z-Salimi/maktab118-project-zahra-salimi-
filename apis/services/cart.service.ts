import axios from 'axios';

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Cart {
  items: CartItem[];
}

export const getCart = async (userId: string): Promise<Cart> => {
  try {
    const response = await axios.get(`http://localhost:8000/api/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart", error);
    return { items: [] };
  }
};

export const addToCart = async (userId: string, productId: string, quantity: number): Promise<Cart> => {
  try {
    const response = await axios.post('http://localhost:8000/api/cart/add', {
      userId,
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart", error);
    return { items: [] };
  }
};

export const removeFromCart = async (userId: string, productId: string): Promise<Cart> => {
  try {
    const response = await axios.post('http://localhost:8000/api/cart/remove', {
      userId,
      productId,
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from cart", error);
    return { items: [] };
  }
};

export const clearCart = async (userId: string): Promise<Cart> => {
  try {
    const response = await axios.post('http://localhost:8000/api/cart/clear', {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error clearing cart", error);
    return { items: [] };
  }
};
