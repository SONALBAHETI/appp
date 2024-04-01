"use client";

import { Permission, Role } from "@/constants/user";
import withAuthorization from "./withAuthorization";

type WrapperComponentProps = {
  children: React.ReactNode;
};

const WrapperComponent = ({ children }: WrapperComponentProps) => {
  return <>{children}</>;
};

type FallbackComponentProps = {
  fallback: React.ReactNode;
};

const FallbackComponentWrapper = ({ fallback }: FallbackComponentProps) => {
  return <>{fallback}</>;
};

/**
 * This component is used to conditionally render child components
 * depending on the user's permissions and roles.
 */
export default function ProtectedComponent({
  children,
  requiredPermissions,
  allowedRoles,
  fallback,
}: {
  children: React.ReactNode;
  requiredPermissions?: Permission[];
  allowedRoles?: Role[];
  fallback?: React.ReactNode;
}) {
  return (
    <>
      {withAuthorization<WrapperComponentProps, FallbackComponentProps>(
        allowedRoles,
        requiredPermissions
      )({
        SuccessComponent: WrapperComponent,
        FallbackComponent: FallbackComponentWrapper,
        children,
        fallback,
      })}
    </>
  );
}
