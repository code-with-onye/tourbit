/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { UseFormReset, FieldValues, DefaultValues } from "react-hook-form";

interface UseFormResetOptions<TFormValues extends FieldValues, TData> {
  form: {
    reset: UseFormReset<TFormValues>;
  };
  data: TData | undefined;
  dependencies?: any[];
  mapDataToFormValues: (data: TData) => DefaultValues<TFormValues>;
}

export function useFormReset<TFormValues extends FieldValues, TData>({
  form,
  data,
  dependencies = [],
  mapDataToFormValues,
}: UseFormResetOptions<TFormValues, TData>) {
  useEffect(() => {
    if (data) {
      const formValues = mapDataToFormValues(data);
      form.reset(formValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, data, ...dependencies]);
}
