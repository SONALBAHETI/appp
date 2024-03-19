import ButtonIcon from "@/components/ui/ButtonIcon";
import { IconType } from "@/components/ui/Icon";
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

interface IRejectChatRequestDialogProps {
  onConfirmReject: () => void;
  loading?: boolean;
}

export default function RejectChatRequestDialog({
  onConfirmReject,
  loading,
}: IRejectChatRequestDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <ButtonIcon
          disabled={loading}
          className="h-12 w-12"
          iconType={IconType.X}
          variant="outline"
          iconSize={20}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Chat requests once declined cannot be undone. But they can still
            send you a new one.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmReject}>
            Reject
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
