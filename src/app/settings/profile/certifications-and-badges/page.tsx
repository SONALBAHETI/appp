import UserBadgeList from "@/components/settings/profile/Badges/UserBadgeList";

export default function CertificationsAndBadgesPage() {
  return (
    <div className="flex flex-col gap-y-8">
      {/* Badges */}
      <div className="flex flex-col gap-y-4">
        <h4>My badges</h4>
        <UserBadgeList />
      </div>

      {/* Certificates */}
      <div className="flex flex-col gap-y-4">
        <h4>My certificates</h4>
      </div>
    </div>
  );
}
