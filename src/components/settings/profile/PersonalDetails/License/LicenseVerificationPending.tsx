import { invalidateCurrentVerificationStepQuery } from "@/api/mentorVerification";
import { IGetCurrentVerificationStepResponse } from "@/interfaces/verification";
import { useQueryClient } from "@tanstack/react-query";
import VerificationPending from "../Verification/VerificationPending";

export default function LicenseVerificationPending({
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
      title="Your license is under review."
      onRefreshStatus={onRefreshStatus}
    />
  );
}
