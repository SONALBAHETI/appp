export default function OnlineStatus({
  status,
}: {
  status: "online" | "offline" | undefined;
}) {
  return (
    <div className="flex items-center gap-1">
      <div
        className={`w-3 h-3 ${
          status === "online" ? "bg-green-500" : "bg-muted"
        } rounded-full`}
      ></div>
      <p className="text-sm text-muted-foreground">{status}</p>
    </div>
  );
}
