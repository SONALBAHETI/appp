import VerificationDocumentUpload, {
  IVerificationDocumentUploadProps,
} from "../Verification/VerificationDocumentUpload";

export default function UploadLicense(
  props: Omit<IVerificationDocumentUploadProps, "children">
) {
  return (
    <VerificationDocumentUpload {...props}>
      {/* Document upload instructions */}
      <div className="bg-secondary rounded-lg p-4 flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h6 className="text-faded">
            Upload an official document that shows:
          </h6>
          <ul className="list-disc ml-5 text-faded text-sm">
            <li>Your full name</li>
            <li>Your medical professional status</li>
            <li>A currently valid date</li>
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <h6 className="text-faded">Acceptable examples include:</h6>
          <ul className="list-disc ml-5 text-faded text-sm">
            <li>Certificate of license</li>
            <li>Nursing ID card with expiration date</li>
            <li>Photo ID and recent Pay Stub</li>
          </ul>
        </div>
      </div>
    </VerificationDocumentUpload>
  );
}
