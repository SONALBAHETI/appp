import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ICertificate } from "@/interfaces/profile";
import { getFormattedDate } from "@/lib/date";

export default function CertificateCard({
  name,
  dateOfIssue,
  expirationDate,
}: Omit<ICertificate, "_id">) {
  const formattedDateOfIssue = getFormattedDate(new Date(dateOfIssue), {
    year: "numeric",
  });
  const formattedDateOfExpiry = expirationDate
    ? getFormattedDate(new Date(expirationDate), {
        year: "numeric",
      })
    : "Present";
  return (
    <Card className="bg-secondary">
      <CardHeader className="h-full justify-between">
        <CardTitle className="text-base">{name}</CardTitle>
        <div className="text-sm">
          <p>{formattedDateOfIssue} - {formattedDateOfExpiry}</p>
        </div>
      </CardHeader>
    </Card>
  );
}
