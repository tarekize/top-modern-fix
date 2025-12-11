import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, icon, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium text-foreground/80">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-14 w-full rounded-xl border-2 border-input bg-card px-4 py-3 text-base font-medium",
              "transition-all duration-300 ease-out",
              "placeholder:text-muted-foreground/60",
              "focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20",
              "hover:border-primary/50",
              "disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-12",
              error && "border-destructive focus:border-destructive focus:ring-destructive/20",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-destructive animate-slide-up">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
