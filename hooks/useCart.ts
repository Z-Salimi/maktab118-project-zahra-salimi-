
import { addToCart, getCart, removeFromCart } from '@/apis/services/cart.service';
import { useQuery, useMutation, useQueryClient } from 'react-query';

interface CartItem {
  price: number;
  image: string;
  productId: string;
  name: string;
  quantity: number;
}

interface Cart {
  items: CartItem[];
}

export const useCart = (userId: string) => {
  return useQuery<Cart, Error>(['cart', userId], () => getCart(userId));
};

export const useAddToCart = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation((params: { userId: string; productId: string; quantity: number }) => addToCart(params.userId, params.productId, params.quantity), {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', userId]);
    },
  });
};

export const useRemoveFromCart = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation((params: { userId: string; productId: string }) => removeFromCart(params.userId, params.productId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', userId]);
    },
  });
};
