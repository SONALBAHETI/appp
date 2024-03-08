"use client";

import { useEffect } from "react";
import { useSbCalls } from ".";

interface SbAuthenticatorProps {
  appId: string;
  userId: string;
}

export default function SbCallsAuthenticator({
  appId,
  userId,
}: SbAuthenticatorProps) {
  const sbCalls = useSbCalls();

  useEffect(() => {
    const authenticate = async () => {
      try {
        sbCalls.init(appId);
        await sbCalls.auth({ userId });
      } catch (error) {
        console.error("erer", error);
      }
    };

    authenticate();

    return () => {
      sbCalls.deauth();
    };
  }, []);

  return null;
}
