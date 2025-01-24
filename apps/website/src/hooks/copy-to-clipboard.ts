import { handleSuccess } from "@/lib/form-handler";
import { useState, useCallback } from "react";

interface UseCopyToClipboardReturn {
  isCopied: boolean;
  copyToClipboard: (text: string) => Promise<void>;
}

export const useCopyToClipboard = (): UseCopyToClipboardReturn => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      handleSuccess("Copied to clipboard");

      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setIsCopied(false);
    }
  }, []);

  return { isCopied, copyToClipboard };
};
