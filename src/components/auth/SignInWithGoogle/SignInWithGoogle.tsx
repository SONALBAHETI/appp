"use client";

import { apiRoutes } from "@/api/routes";
import { api } from "@/lib/api";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignInWithGoogle() {
  const router = useRouter();

  const sendCode = async (credential?: string) => {
    await api.post(apiRoutes.auth.loginWithGoogle, {
      credential,
    });
    router.push("/");
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
