import PopularInboxLinks from "@/components/email/PopularInboxLinks";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function VerifyEmailRequestPage() {
  return (
    <div className="absolute-center h-screen">
      <Card className="rounded-lg shadow-md max-w-md text-center">
        <CardHeader>
          <h3>Verify your email</h3>
        </CardHeader>
        <CardContent>
          <p className="text-faded mb-2">
            A verification link has been sent to your email address. Please
            check your inbox and click on the link to verify your email.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 items-center">
          <h6>Open your inbox</h6>
          <Separator className="w-40" />
          <PopularInboxLinks />
        </CardFooter>
      </Card>
    </div>
  );
}
