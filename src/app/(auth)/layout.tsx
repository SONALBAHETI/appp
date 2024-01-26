import GoogleAuthProvider from "@/providers/GoogleAuthProvider";
import TwoColumnsPageTemplate, {
  LeftColumn,
  RightColumn,
} from "@/templates/TwoColumnsPageTemplate";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TwoColumnsPageTemplate>
      <LeftColumn>
        <GoogleAuthProvider>
          <div className="flex-1 w-full md:max-w-lg">{children}</div>
        </GoogleAuthProvider>
      </LeftColumn>
      <RightColumn>
        <img
          src="/assets/svg/sign-in-illustration.svg"
          alt="Sign In Illustration"
        />
      </RightColumn>
    </TwoColumnsPageTemplate>
  );
}
