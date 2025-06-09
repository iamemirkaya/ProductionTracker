import type { workshopApi } from "./workshopApi";


export const handleDeleteWorkshop = async (
  id: string,
  deleteWorkshop: ReturnType<typeof workshopApi.endpoints.deleteWorkshop.useMutation>[0],
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  try {
    await deleteWorkshop(id).unwrap();
    if (onSuccess) onSuccess();
  } catch (err) {
    if (onError) onError(err);
  }
};