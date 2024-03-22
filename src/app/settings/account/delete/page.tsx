import {
  DeactivateAccount,
  DeleteAccount,
} from "@/components/settings/account/DeleteAccount";

export default function DeleteAccountPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-destructive">Danger zone</h4>
        <p className="text-faded">Please proceed with caution.</p>
      </div>
      <div className="max-w-md">
        <DeactivateAccount />
        <p className="text-faded mt-2">
          This will suspend your account until you sign back in.
        </p>
      </div>
      <div className="max-w-md">
        <DeleteAccount />
        <p className="text-faded mt-2">
          This will suspend your account immediately and schedule it for
          deletion in <b>14 days</b> until you sign back in.
        </p>
      </div>
    </div>
  );
}
