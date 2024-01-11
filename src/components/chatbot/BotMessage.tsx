import ScottieProfilePic from "./ScottieProfilePic";

export default function BotMessage({
  message,
  children,
}: {
  message: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <ScottieProfilePic size="sm" className="mt-[0.7rem]" />
      <div className="bot-message">
        <p>{message}</p>
        {children}
      </div>
    </div>
  );
}
