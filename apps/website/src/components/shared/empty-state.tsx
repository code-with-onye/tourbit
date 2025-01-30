import React from "react";
import clsx from "clsx";

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  iconClassName?: string;
  containerClassName?: string;
  gradientClassName?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  iconClassName = "",
  containerClassName = "",
  gradientClassName = "",
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col w-full h-full items-center justify-center p-6 bg-slate-50/30",
        containerClassName
      )}
    >
      <div className="text-center space-y-4 flex flex-col justify-center items-center">
        <div className="relative">
          {Icon && (
            <Icon
              className={clsx(
                "w-32 h-32 text-muted-foreground/30 ",
                iconClassName
              )}
            />
          )}
          <div
            className={clsx(
              "absolute inset-0 bg-gradient-to-t from-slate-50/30 to-transparent",
              gradientClassName
            )}
          />
        </div>
        <div className="space-y-2 max-w-[300px]">
          <h3 className="text-xl font-semibold text-slate-700">{title}</h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

