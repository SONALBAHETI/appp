export default function PopularInboxLinks() {
  return (
    <ul className="flex gap-2 items-stretch text-center">
      <li className="flex-1 flex-shrink-0">
        <a
          className="flex flex-col gap-1 items-center justify-center text-sm card h-full hover:bg-muted"
          href="https://mail.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="w-8 h-8 object-contain"
            src="/assets/svg/mail/gmail.svg"
            alt="Gmail logo"
          />
          Gmail
        </a>
      </li>
      <li className="flex-1 flex-shrink-0">
        <a
          className="flex flex-col gap-1 items-center justify-center text-sm card h-full hover:bg-muted"
          href="https://outlook.live.com/mail/0/inbox"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="w-8 h-8 object-contain"
            src="/assets/svg/mail/outlook.svg"
            alt="Outlook logo"
          />
          Outlook
        </a>
      </li>
      <li className="flex-1 flex-shrink-0">
        <a
          className="flex flex-col gap-1 items-center justify-center text-sm card h-full hover:bg-muted"
          href="https://mail.yahoo.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="w-10 h-8 object-contain"
            src="/assets/svg/mail/yahoo-mail.svg"
            alt="Yahoo logo"
          />
          Yahoo Mail
        </a>
      </li>
      <li className="flex-1 flex-shrink-0">
        <a
          className="flex flex-col gap-1 items-center justify-center text-sm card h-full hover:bg-muted"
          href="https://www.icloud.com/mail/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="w-8 h-8 object-contain"
            src="/assets/svg/mail/icloud-mail.svg"
            alt="Icloud mail logo"
          />
          iCloud Mail
        </a>
      </li>
    </ul>
  );
}
