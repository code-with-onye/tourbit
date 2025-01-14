import { toast } from "sonner";

const handleSuccess = (message: string) => {
  toast.success(message);
};

const handleError = (err: unknown) => {
  toast.error(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (err as any)?.response?.data?.message || "An error occurred"
  );
};

export { handleSuccess, handleError };
