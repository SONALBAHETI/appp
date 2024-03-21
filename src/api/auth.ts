import { apiRoutes } from "./routes";
import { usePost } from "@/lib/react-query";
import { TSignInForm } from "@/validation/signinForm.validation";
import {
  ILogoutResponse,
  IResetPasswordResponse,
  ISendResetPasswordEmailResponse,
  ISignInWithEmailPasswordResponse,
  ISignUpWithEmailPasswordResponse,
  IVerifyEmailResponse,
} from "@/interfaces/auth";
import { createQueryKey } from "@/lib/react-query/utils";
import { SignUpForm } from "@/components/auth/SignupForm/validation";

export const getLogoutMutationKey = () => createQueryKey(apiRoutes.logout);
export const getSignInWithEmailPasswordMutationKey = () =>
  createQueryKey(apiRoutes.auth.signInWithEmailPassword);
export const getSignUpWithEmailPasswordMutationKey = () =>
  createQueryKey(apiRoutes.auth.signUpWithEmailPassword);
export const getVerifyEmailMutationKey = () =>
  createQueryKey(apiRoutes.auth.verifyEmail);
export const getSendResetPasswordEmailMutationKey = () =>
  createQueryKey(apiRoutes.auth.sendResetPasswordEmail);
export const getSendResetPasswordEmailWithAuthMutationKey = () =>
  createQueryKey(apiRoutes.auth.sendResetPasswordEmailWithAuth);
export const getResetPasswordMutationKey = () =>
  createQueryKey(apiRoutes.auth.resetPassword);

export const useLogoutMutation = () =>
  usePost<undefined, ILogoutResponse>({
    queryKey: getLogoutMutationKey(),
  });

export const useSignInWithEmailPasswordMutation = () => {
  return usePost<TSignInForm, ISignInWithEmailPasswordResponse>({
    queryKey: getSignInWithEmailPasswordMutationKey(),
  });
};

// Generates a mutation hook for signing up with email and password.
export const useSignUpWithEmailPasswordMutation = () => {
  return usePost<SignUpForm, ISignUpWithEmailPasswordResponse>({
    queryKey: getSignUpWithEmailPasswordMutationKey(),
  });
};

// Generates a mutation hook for verifying email.
export const useVerifyEmailMutation = () => {
  return usePost<{ token: string }, IVerifyEmailResponse>({
    queryKey: getVerifyEmailMutationKey(),
  });
};

// Generates a mutation hook for sending reset password email.
export const useSendResetPasswordEmailMutation = () => {
  return usePost<
    { email: string; redirect: string },
    ISendResetPasswordEmailResponse
  >({
    queryKey: getSendResetPasswordEmailMutationKey(),
  });
};

// Generates a mutation hook for sending authenticated reset password email.
export const useSendResetPasswordEmailMutationWithAuth = () => {
  return usePost<{ redirect: string }, ISendResetPasswordEmailResponse>({
    queryKey: getSendResetPasswordEmailWithAuthMutationKey(),
  });
};

// Generates a mutation hook for resetting password.
export const useResetPasswordMutation = () => {
  return usePost<{ token: string; password: string }, IResetPasswordResponse>({
    queryKey: getResetPasswordMutationKey(),
  });
};
