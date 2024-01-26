export function LeftColumn({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 w-full md:max-w-lg">{children}</div>;
}

export function RightColumn({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 hidden md:flex md:flex-col md:items-center">
      {children}
    </div>
  );
}

export default function TwoColumnsPageTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex page-width min-h-screen items-center px-8 md:px-12 lg:px-24">
      <div className="flex w-full flex-col md:flex-row md:items-center">
        {children}
      </div>
    </main>
  );
}
