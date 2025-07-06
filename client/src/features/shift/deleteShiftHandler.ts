import type { shiftApi } from "./shiftApi";

export const handleDeleteShift = async (
  id: string,
  deleteShift: ReturnType<typeof shiftApi.endpoints.deleteShift.useMutation>[0],
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  try {
    await deleteShift(id).unwrap();
    if (onSuccess) onSuccess();
  } catch (err) {
    if (onError) onError(err);
  }
};