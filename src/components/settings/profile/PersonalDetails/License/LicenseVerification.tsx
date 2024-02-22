import { useCurrentVerificationStepQuery } from "@/api/mentorVerification";
import LicenseDetailForm from "./LicenseDetailForm";
import { UploadLicense } from ".";

export default function LicenseVerification() {
  const { data, isPending, isError } = useCurrentVerificationStepQuery();

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Something went wrong</div>;
  }
  return (
    <>
      {data.currentStep === "notStarted" && <LicenseDetailForm />}
      {data.currentStep === "success" && <LicenseDetailForm />}
      {data.currentStep === "docUpload" && <UploadLicense />}
    </>
  );
}
