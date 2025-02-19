"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassName, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className={cn("relative w-full", containerClassName)}>
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={cn(
            "flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          // defaultValue={props.defaultValue}
          {...props}
          placeholder={props.placeholder}
        />
        {type === "password" ? (
          showPassword ? ( // Render the eye icon based on the "showPassword" state
            <div className="flex absolute right-0 items-center h-full top-0 px-3">
              <Eye
                onClick={() => setShowPassword(false)}
                className="cursor-pointer w-5 text-gray-400"
              />
            </div>
          ) : (
            <div className="flex absolute right-0 items-center h-full top-0 px-3">
              <EyeOff
                onClick={() => setShowPassword(true)}
                className="cursor-pointer w-5 text-gray-400"
              />
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
