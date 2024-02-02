"use client";

import { apiRoutes } from "@/api/routes";
import { ILoginWithGoogleResponse } from "@/interfaces/auth";
import { api } from "@/lib/api";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignInWithGoogle() {
  const router = useRouter();

  const sendCode = async (credential?: string) => {
    const response = await api.post<ILoginWithGoogleResponse>(
      apiRoutes.auth.loginWithGoogle,
      {
        credential,
      }
    );
    response.data.user?.accountStatus?.isOnboarded
      ? router.push("/")
      : router.push("/onboarding");
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          sendCode(credentialResponse.credential);
        }}
        onError={() => {
          toast.error("Couldn't sign in with Google. Please try again.");
        }}
        size="large"
        text="continue_with"
        shape="pill"
        useOneTap
      />
    </div>
  );
}
