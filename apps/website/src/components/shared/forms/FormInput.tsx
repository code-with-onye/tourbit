import { ReactNode } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputType = "email" | "text" | "password";

interface FormInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder: string;
  description?: string;
  inputType: InputType;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
}

interface FormFooterProps {
  cancelContent: string;
  submitContent: string;
  isLoading?: boolean;
  disabled?: boolean;
  isPopup?: boolean;
  onClose?: () => void | undefined;
}

const FormInput = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  inputType,
  isLoading,
  className,
  disabled,
}: FormInputProps<TFieldValues>): React.ReactElement => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(["w-full", className])}>
          <FormLabel className="text-xs">{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              type={inputType}
              disabled={isLoading || disabled}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FormFooter = (props: FormFooterProps) => {
  return (
    <div className="flex items-center gap-x-2 w-full mt-4">
      {props.isPopup ? (
        <div
          className={buttonVariants({
            variant: "outline",
            className: "cursor-pointer",
          })}
          onClick={() => props.onClose?.()}
        >
          {props.cancelContent}
        </div>
      ) : null}
      <Button isLoading={props.isLoading} disabled={props.disabled}>
        {props.submitContent}
      </Button>
    </div>
  );
};

const FormInputWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="flex sm:flex-row flex-col items-center sm:gap-x-2 gap-y-4 w-full">{children}</div>;
};

export { FormInput, FormFooter, FormInputWrapper };
