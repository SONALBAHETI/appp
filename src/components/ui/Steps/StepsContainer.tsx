import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import * as React from "react";

export const Step = React.forwardRef<
  React.ElementRef<typeof TabsTrigger>,
  Omit<React.ComponentPropsWithoutRef<typeof TabsTrigger>, "value"> & {
    stepNumber?: number;
    active?: boolean;
    completed?: boolean;
  }
>(
  (
    { className, active = false, completed = false, stepNumber = 0, ...props },
    ref
  ) => {
    const activeClass =
      "bg-accent-2 data-[state=active]:bg-accent-2 data-[state=active]:text-accent-2-foreground text-accent-2-foreground";
    const completedClass = "border border-accent-2 text-accent-2";

    return (
      <TabsTrigger
        ref={ref}
        value={stepNumber.toString()}
        className={cn(
          "rounded-full py-1 px-8 flex items-center justify-center border-[1px] font-bold",
          active ? activeClass : "",
          completed ? completedClass : "",
          className
        )}
        {...props}
      />
    );
  }
);

export const StepContent = React.forwardRef<
  React.ElementRef<typeof TabsContent>,
  Omit<React.ComponentPropsWithoutRef<typeof TabsContent>, "value"> & {
    stepNumber: number;
  }
>(({ className, children, stepNumber, ...props }, ref) => {
  return (
    <TabsContent
      value={stepNumber + ""}
      ref={ref}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </TabsContent>
  );
});

export const StepsList = React.forwardRef<
  React.ElementRef<typeof TabsList>,
  React.ComponentPropsWithoutRef<typeof TabsList> & {
    activeStep?: number;
  }
>(({ className, children, activeStep, ...props }, ref) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <TabsList
      ref={ref}
      className={cn(
        "flex items-center justify-start flex-wrap bg-transparent",
        className
      )}
      {...props}
    >
      {React.Children.map(childrenArray, (child, index) => {
        if (React.isValidElement(child)) {
          if (child.type === Step) {
            return (
              <div className="flex items-center">
                {index !== 0 && (
                  <div
                    className={`h-[1.5px] ${
                      child.props.disabled
                        ? "bg-muted-foreground/50"
                        : "bg-muted-foreground"
                    } w-4`}
                  />
                )}
                <child.type
                  value={index + ""}
                  active={index === activeStep}
                  stepNumber={index}
                  {...child.props}
                />
              </div>
            );
          } else if (child.type !== StepContent) {
            return <child.type {...child.props} />;
          }
        }
      })}
    </TabsList>
  );
});

const StepsContainer = React.forwardRef<
  React.ElementRef<typeof Tabs>,
  React.ComponentPropsWithoutRef<typeof Tabs> & {
    activeStep: number;
    onStepChange: (value: number) => void;
  }
>(({ className, children, activeStep, onStepChange, ...props }, ref) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <Tabs
      value={activeStep.toString()}
      onValueChange={(value) => onStepChange?.(Number(value))}
      ref={ref}
      className={cn(className)}
      {...props}
    >
      {React.Children.map(childrenArray, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === StepsList) {
            return <child.type activeStep={activeStep} {...child.props} />;
          } else {
            return <child.type {...child.props} />;
          }
        }
      })}
    </Tabs>
  );
});

export default StepsContainer;
