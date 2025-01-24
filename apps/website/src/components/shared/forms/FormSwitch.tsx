import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import clsx from "clsx";

interface FormSwitchProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  description?: string;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  onBlur?: () => void | Promise<void>;
}

export const FormSwitch = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  isLoading = false,
  className,
  disabled = false,
  onBlur,
}: FormSwitchProps<TFieldValues>): React.ReactElement => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={clsx(
            "flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm",
            className
          )}
        >
          <div className="space-y-0.5">
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled || isLoading}
              onBlur={onBlur}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
