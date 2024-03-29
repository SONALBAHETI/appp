import VerificationDocumentUpload, {
  IVerificationDocumentUploadProps,
} from "../Verification/VerificationDocumentUpload";

export default function StudentVerificationDocumentUpload(
  props: Omit<IVerificationDocumentUploadProps, "children">
) {
  return (
    <VerificationDocumentUpload {...props}>
      {/* Document upload instructions */}
      <div className="bg-secondary rounded-lg p-4 flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h6>
            To continue your verification, upload a document that confirm your
            student status.
          </h6>
          <h6 className="text-faded mt-2">The document must include -</h6>
          <ul className="list-disc ml-5 text-faded text-sm">
            <li>
              Your <b>full name</b> as entered into this form.
            </li>
            <li>
              The full or abbreviated <b>academic institution name</b> or logo.
            </li>
            <li>
              <b>Date</b> within the current academic year OR no more than 90
              days from today&apos;s date.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <h6 className="text-faded">Acceptable examples include:</h6>
          <ul className="list-disc ml-5 text-faded text-sm">
            <li>University ID card with expiration date</li>
            <li>Class schedule</li>
            <li>Tuition receipt</li>
          </ul>
        </div>
      </div>
    </VerificationDocumentUpload>
  );
}
