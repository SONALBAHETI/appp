import { ICertificate } from "@/interfaces/profile";
import CertificateCard from "./CertificateCard";
import CertificateCardSkeleton from "./CertificateSkeleton";

interface ICertificatesProps {
  certificates?: ICertificate[];
  isLoading?: boolean;
}

export default function Certificates({
  certificates,
  isLoading,
}: ICertificatesProps) {
  const hasCertificates = certificates && certificates.length > 0;
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {hasCertificates &&
          certificates.map((certificate) => (
            <CertificateCard
              key={certificate._id}
              name={certificate.name}
              dateOfIssue={certificate.dateOfIssue}
              expirationDate={certificate.expirationDate}
            />
          ))}
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <CertificateCardSkeleton key={index} />
          ))}
      </div>
      {!hasCertificates && !isLoading && (
        <p className="text-center rounded-lg text-sm p-8 bg-secondary text-muted-foreground">
          No certificates added yet
        </p>
      )}
    </div>
  );
}
