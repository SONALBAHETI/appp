import { useCurrentStudentVerificationStepQuery } from "@/api/studentVerification";
import Loader from "@/components/ui/Loader";
import StudentVerificationDetailForm from "./StudentVerificationDetailForm";
import VerificationSuccessful from "../License/VerificationSuccessful";
import StudentVerificationPending from "./StudentVerificationPending";
import StudentVerificationDocumentUpload from "./StudentVerificationDocumentUpload";

interface IStudentVerificationProps {
  onSubmitting: (isSubmitting: boolean) => void;
}

export default function StudentVerification({
  onSubmitting,
}: IStudentVerificationProps) {
  const { data, isPending, isRefetching, isError } =
    useCurrentStudentVerificationStepQuery();

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
        <StudentVerificationDetailForm onSubmitting={onSubmitting} />
      )}
      {data.currentStep === "pending" && (
        <StudentVerificationPending verificationStatus={data} />
      )}
      {data.currentStep === "success" && <VerificationSuccessful />}
      {data.currentStep === "docUpload" && (
        <StudentVerificationDocumentUpload verificationStatus={data} onSubmitting={onSubmitting} />
      )}
    </>
  );
}
