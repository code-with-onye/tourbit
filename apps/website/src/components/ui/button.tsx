import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { LoadingIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-6 py-4 px-2 text-xs",
        block: "w-full justify-center items-center flex py-2 block",
        sm: "h-6 rounded-md px-2 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconClassName?: string;
  iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      icon: Icon,
      iconClassName,
      iconPosition = "left",
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const getColor = () => {
      switch (variant) {
        case "default":
        case "destructive":
        case "secondary":
          return "text-primary-foreground";
        case "outline":
        case "ghost":
        case "link":
          return "text-foreground";
        default:
          return "text-primary-foreground";
      }
    };

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          isLoading && "cursor-not-allowed opacity-50"
        )}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex w-full justify-center items-center gap-x-2">
            <LoadingIcon className="animate-spin w-4 h-4" />
            <p className={cn("text-sm", getColor())}>Loading...</p>
          </div>
        ) : (
          <>
            {Icon && iconPosition === "left" && (
              <Icon
                className={cn("mr-2 w-electra-icon", getColor(), iconClassName)}
              />
            )}
            {children}
            {Icon && iconPosition === "right" && (
              <Icon
                className={cn("ml-2 w-electra-icon", getColor(), iconClassName)}
              />
            )}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
