
import {
  deleteProduct,
  updateProduct,
  updateProductStock,
} from "@/apis/services/product.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      productId,
      updatedProduct,
    }: {
      productId: string;
      updatedProduct: Partial<IProduct>;
    }) => updateProduct(productId, updatedProduct),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
export const useUpdateProductStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      productId,
      updatedProduct,
    }: {
      productId: string;
      updatedProduct: Partial<IProduct>;
    }) => updateProductStock(productId, updatedProduct),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
