"use client";

import { useRightsQuery } from "@/api/user";
import { Permission, Role } from "@/constants/user";
import { useCallback } from "react";

type WithAuthorizationProps<T, FP> = {
  SuccessComponent: React.FC<T>;
  FallbackComponent?: React.FC<FP>;
};

/**
 * A higher order component that allows you to conditionally render
 * a component depending on the user's permissions and roles.
 */
const withAuthorization = <T extends object, FP extends object = {}>(
  allowedRoles?: Role[],
  requiredPermissions?: Permission[]
): (<C extends WithAuthorizationProps<T, FP>>(
  props: C
) => React.ReactElement | null) => {
  return <C extends WithAuthorizationProps<T, FP>>({
    SuccessComponent,
    FallbackComponent,
    ...props
  }: C) => {
    const rightsQuery = useRightsQuery();
    const hasPermissions = useCallback(() => {
      if (rightsQuery.data && (requiredPermissions || allowedRoles)) {
        let hasPerms = true;
        // user must have all required permissions
        if (requiredPermissions && requiredPermissions.length > 0) {
          hasPerms = requiredPermissions.every((requiredPermission) =>
            rightsQuery.data.rights.includes(requiredPermission)
          );
        }
        // user must have at least one of the allowed roles
        if (allowedRoles && allowedRoles.length > 0) {
          hasPerms = hasPerms && allowedRoles.includes(rightsQuery.data.role);
        }
        return hasPerms;
      }
      return false;
    }, [rightsQuery.data, requiredPermissions]);

    if (rightsQuery.isPending || rightsQuery.isError) {
      return null;
    }

    if (hasPermissions()) {
      return <SuccessComponent {...(props as T)} />;
    }

    return FallbackComponent ? <FallbackComponent {...(props as FP)} /> : null;
  };
};

export default withAuthorization;
