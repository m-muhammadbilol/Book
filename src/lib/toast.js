import { toast } from "sonner";

export const customToast = {
  success: (message, options) =>
    toast.success(message, {
      description: options?.description,
      duration: 4000,
    }),

  error: (message, options) =>
    toast.error(message, {
      description: options?.description,
      duration: 4000,
    }),

  warning: (message, options) =>
    toast.warning(message, {
      description: options?.description,
      duration: 4000,
    }),

  info: (message, options) =>
    toast(message, {
      description: options?.description,
      duration: 4000,
    }),
};
