export default function UserMessage({
  message,
  children,
}: {
  message?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="user-message">
      {message && <p>{message}</p>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
