import { invalidateCurrentVerificationStepQuery } from "@/api/mentorVerification";
import { Button } from "@/components/ui/button";
import { IGetCurrentVerificationStepResponse } from "@/interfaces/verification";
import { useQueryClient } from "@tanstack/react-query";

export default function LicenseVerificationPending({
  verificationStatus,
}: {
  verificationStatus: IGetCurrentVerificationStepResponse;
}) {
  const queryClient = useQueryClient();

  const onRefreshStatus = () => {
    invalidateCurrentVerificationStepQuery(queryClient);
  };

  const estimatedReviewTime =
    verificationStatus?.estimatedReviewTime?.replaceAll("_", " ");
  const maxReviewTime = verificationStatus?.maxReviewTime?.replaceAll("_", " ");
  return (
    <div className="rounded-xl border border-accent-2 bg-accent-2-light flex items-center justify-center px-8 py-12">
      <div className="flex flex-col items-center text-center gap-y-6">
        <div>
          <h4 className="text-accent-2">Your license is under review.</h4>
          {estimatedReviewTime && maxReviewTime && (
            <p className="text-faded">
              It may take anywhere from{" "}
              <span className="lowercase font-bold">{estimatedReviewTime}</span>{" "}
              to <span className="lowercase font-bold">{maxReviewTime}</span>
            </p>
          )}
        </div>
        <Button variant="outline" onClick={onRefreshStatus}>Refresh Status</Button>
      </div>
    </div>
  );
}
