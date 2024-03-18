import ButtonIcon from "../ui/ButtonIcon";
import { IconType } from "../ui/Icon";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { AlertDialogHeader, AlertDialogFooter } from "../ui/alert-dialog";

export default function GroupCallEnd({
  onConfirmEnd,
}: {
  onConfirmEnd: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <ButtonIcon
          className="rounded-full w-14 h-14"
          variant="destructive"
          iconSize={24}
          size="default"
          iconType={IconType.ENDCALL}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex flex-col gap-2 text-center">
              <img
                src="/assets/svg/call-end-confirm-dialog-illustration.svg"
                alt="Call end confirmation illustration"
              />
              Are you sure?
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            This will end the session, and you won&#x27;t be able to join until
            next appointment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-primary text-primary hover:text-primary">
            Go back
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirmEnd}
            className="bg-destructive hover:bg-destructive/90"
          >
            End session
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
