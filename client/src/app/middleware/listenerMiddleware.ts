import { createListenerMiddleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ErrorResponse = string | { title: string } | { errors: string[] };

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  predicate: isRejectedWithValue,
  effect: async (action) => {
    const error = action.payload as FetchBaseQueryError;
    const status = error?.status;
    const data = error?.data as ErrorResponse;

    if (status === 400) {
      if (typeof data === "string") {
        toast.error(data);
      } else if ("errors" in data) {
        toast.error((data.errors as string[]).join(", "));
      } else if ("title" in data) {
        toast.error(data.title);
      }
    }

    if (status === 401 && typeof data === "object" && "title" in data) {
      toast.error(data.title);
    }

    if (status === 404) {
      router.navigate("/not-found");
    }

    if (status === 500) {
      router.navigate("/server-error", { state: { error: data } });
    }
  },
});