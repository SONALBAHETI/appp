import { useCurrentVerificationStepQuery } from "@/api/mentorVerification";
import LicenseDetailForm from "./LicenseDetailForm";
import { UploadLicense } from ".";
import VerificationSuccessful from "./VerificationSuccessful";
import Loader from "@/components/ui/Loader";
import LicenseVerificationPending from "./LicenseVerificationPending";

interface ILicenseVerificationProps {
  onSubmitting: (isSubmitting: boolean) => void;
}

export default function LicenseVerification({
  onSubmitting,
}: ILicenseVerificationProps) {
  const { data, isPending, isRefetching, isError } =
    useCurrentVerificationStepQuery();

  if (isPending || isRefetching) {
    return (
      <div className="flex px-4 py-8 items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex px-4 py-8 items-center justify-center">
        Something went wrong
      </div>
    );
  }
  return (
    <>
      {data.currentStep === "notStarted" && (
        <LicenseDetailForm onSubmitting={onSubmitting} />
      )}
      {data.currentStep === "pending" && (
        <LicenseVerificationPending verificationStatus={data} />
      )}
      {data.currentStep === "success" && <VerificationSuccessful />}
      {data.currentStep === "docUpload" && (
        <UploadLicense verificationStatus={data} onSubmitting={onSubmitting} />
      )}
    </>
  );
}
