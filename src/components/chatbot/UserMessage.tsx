export default function UserMessage({
  message,
  children,
}: {
  message: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="user-message">
      <p>{message}</p>
      {children}
    </div>
  );
}
