import { productApi } from './productApi'; 

export const handleDeleteProduct = async (
  id: string,
  deleteProduct: ReturnType<typeof productApi.endpoints.deleteProduct.useMutation>[0],
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  try {
    await deleteProduct(id).unwrap();
    if (onSuccess) onSuccess();
  } catch (err) {
    if (onError) onError(err);
  }
};