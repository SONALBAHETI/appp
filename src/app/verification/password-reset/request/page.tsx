import PasswordResetRequestForm from "@/components/auth/PasswordResetRequestForm";
import TwoColumnsPageTemplate, {
  LeftColumn,
  RightColumn,
} from "@/templates/TwoColumnsPageTemplate";

export default function PasswordResetRequestPage() {
  return (
    <TwoColumnsPageTemplate>
      <LeftColumn>
        <h2>Forgot your password?</h2>
        <p className="text-faded mt-4">
          No problem! Enter your email address and we will send you a link to
          reset your password.
        </p>
        <PasswordResetRequestForm
          className="mt-4"
          redirect={`${process.env.NEXT_PUBLIC_FRONTENT_BASE_URL}`}
        />
      </LeftColumn>

      <RightColumn>
        <img
          src="/assets/svg/password-reset-request-illustration.svg"
          alt="Password reset illustration"
        />
      </RightColumn>
    </TwoColumnsPageTemplate>
  );
}
