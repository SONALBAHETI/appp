import { useCurrentVerificationStepQuery } from "@/api/mentorVerification";
import LicenseDetailForm from "./LicenseDetailForm";
import { UploadLicense } from ".";
import VerificationSuccessful from "./VerificationSuccessful";
import Loader from "@/components/ui/Loader";

interface ILicenseVerificationProps {
  onSubmitting: (isSubmitting: boolean) => void;
}

export default function LicenseVerification({
  onSubmitting,
}: ILicenseVerificationProps) {
  const { data, isPending, isError } = useCurrentVerificationStepQuery();

  if (isPending) {
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
      {data.currentStep === "success" && <VerificationSuccessful />}
      {data.currentStep === "docUpload" && <UploadLicense />}
    </>
  );
}
