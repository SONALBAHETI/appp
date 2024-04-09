"use client";
import { useRightsQuery } from "@/api/user";
import PersonalDetailsComponent from "@/components/settings/profile/PersonalDetails";
import Loader from "@/components/ui/Loader";

export default function PersonalDetails() {
  const rightsQuery = useRightsQuery();

  if (rightsQuery.isPending) {
    return (
      <div className="absolute-center">
        <Loader />
      </div>
    );
  }

  if (rightsQuery.isError) {
    return (
      <div className="absolute-center text-muted-foreground">
        Something went wrong.
      </div>
    );
  }
  return <PersonalDetailsComponent userRole={rightsQuery.data.role} />;
}
