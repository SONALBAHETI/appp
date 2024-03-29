import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerificationSuccessful() {
  return (
    <div className="rounded-xl border border-accent-2 bg-accent-2-light flex items-center justify-center px-8 py-12">
      <div className="flex flex-col items-center text-center gap-y-6">
        <div>
          <h4 className="text-accent-2">Congratulations! Profile verified successfully.</h4>
          <p className="text-faded">
            Now you can go ahead and start collaborating with experts.
          </p>
        </div>
        <Link href="/experts">
          <Button className="w-40">View Profile</Button>
        </Link>
      </div>
    </div>
  );
}
