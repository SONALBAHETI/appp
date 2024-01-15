import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

interface IConfirmDelete extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onConfirmDelete: () => void;
}

const ConfirmDelete = ({ onConfirmDelete, ...props }: IConfirmDelete) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          {...props}
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>Delete Note</AlertDialogHeader>
        <AlertDialogDescription>
          Are you sure you want to delete this note? This action cannot be
          undone.
        </AlertDialogDescription>
        <AlertDialogFooter className="flex justify-start">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={onConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Confirm Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDelete;
