import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface IConfirmDialogProps {
  asChild?: boolean;
  children: React.ReactNode;
  onConfirm: () => void;
  title: string;
  description: string;
  cancelBtnLabel?: string;
  confirmBtnLabel?: string;
  confirmBtnClassName?: string;
}

export default function ConfirmDialog({
  asChild,
  children,
  onConfirm,
  title,
  description,
  cancelBtnLabel = "Cancel",
  confirmBtnLabel = "Confirm",
  confirmBtnClassName,
}: IConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={asChild}>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelBtnLabel}</AlertDialogCancel>
          <AlertDialogAction
            className={cn(
              "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:text-destructive-foreground",
              confirmBtnClassName
            )}
            onClick={onConfirm}
          >
            {confirmBtnLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}