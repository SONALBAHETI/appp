"use client";

import { useEffect } from "react";
import { useSbCalls } from ".";

interface SbAuthenticatorProps {
  appId: string;
  userId: string;
  accessToken: string;
}

export default function SbCallsAuthenticator({
  appId,
  userId,
  accessToken,
}: SbAuthenticatorProps) {
  const sbCalls = useSbCalls();

  useEffect(() => {
    const authenticate = async () => {
      try {
        sbCalls.init(appId);
        await sbCalls.auth({ userId, accessToken });
      } catch (error) {
        console.error("error", error);
      }
    };

    authenticate();

    return () => {
      sbCalls.deauth();
    };
  }, []);

  return null;
}
