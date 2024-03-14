export default function NoChatRequestSelected() {
  return (
    <div className="flex max-w-sm flex-col gap-2 text-center">
      <img
        src="/assets/svg/select-chat-request-illustration.svg"
        alt="No chat request selected illustration"
      />
      <h3>Select a chat request</h3>
      <p className="text-faded">
        Requests once declined cannot be undone but they can still send you
        requests again.
      </p>
    </div>
  );
}
