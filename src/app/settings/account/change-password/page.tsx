import PasswordResetRequestForm from "@/components/auth/PasswordResetRequestForm";

export default function ChangePasswordPage() {
  return (
    <div className="absolute-center flex-col gap-4 h-full">
      {/* Illustration */}
      <img
        src="/assets/svg/change-password-illustration.svg"
        alt="Change password"
      />

      {/* Send password reset email */}
      <div className="text-center">
        <h4>Change your password</h4>
        <p className="text-faded mt-1">
          You will receive a link to reset your password on your email.
        </p>
      </div>

      <PasswordResetRequestForm
        redirect={`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}`}
        showEmailField={false}
      />
    </div>
  );
}
