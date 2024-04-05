import { invalidateCurrentVerificationStepQuery } from "@/api/studentVerification";
import { IGetCurrentVerificationStepResponse } from "@/interfaces/verification";
import { useQueryClient } from "@tanstack/react-query";
import VerificationPending from "../Verification/VerificationPending";

export default function StudentVerificationPending({
  verificationStatus,
}: {
  verificationStatus: IGetCurrentVerificationStepResponse;
}) {
  const queryClient = useQueryClient();

  const onRefreshStatus = () => {
    invalidateCurrentVerificationStepQuery(queryClient);
  };

  return (
    <VerificationPending
      verificationStatus={verificationStatus}
      title="Student verification is under review."
      onRefreshStatus={onRefreshStatus}
    />
  );
}