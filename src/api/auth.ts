import { apiRoutes } from "./routes";
import { usePost } from "@/lib/react-query";
import { TSignInForm } from "@/validation/signinForm.validation";
import {
  ILogoutResponse,
  ISignInWithEmailPasswordResponse,
} from "@/interfaces/auth";
import { createQueryKey } from "@/lib/react-query/utils";

export const getLogoutMutationKey = () => createQueryKey(apiRoutes.logout);
export const getSignInWithEmailPasswordMutationKey = () =>
  createQueryKey(apiRoutes.signInWithEmailPassword);

export const useLogoutMutation = () =>
  usePost<undefined, ILogoutResponse>({
    queryKey: getLogoutMutationKey(),
  });

export const useSignInWithEmailPasswordMutation = () => {
  return usePost<TSignInForm, ISignInWithEmailPasswordResponse>({
    queryKey: getSignInWithEmailPasswordMutationKey(),
  });
};
