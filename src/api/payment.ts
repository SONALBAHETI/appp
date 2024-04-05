import {
  ICreditsCheckoutRequest,
  ISubscriptionCheckoutRequest,
  ICheckoutResponse,
  IGetCreditBalanceResponse,
  IGetUserSubscriptionResponse,
  ICustomerPortalRequest,
  ICustomerPortalResponse,
  ICreateStripeConnectedAccountRequest,
  ICreateStripeConnectedAccountResponse,
  IGetConnectedAccountStatusResponse,
  IStripeEnabledResponse,
  ICreateConnectedAccountOnboardingLinkRequest,
  ICreateConnectedAccountOnboardingLinkResponse,
  ICreateConnectedAccountLoginLinkResponse,
} from "@/interfaces/payment";
import { useFetch, usePost } from "@/lib/react-query";
import { createQueryKey } from "@/lib/react-query/utils";
import { apiRoutes } from "./routes";

/**
 * Query hook to get credit balance of the logged in user
 */
export const useCreditBalanceQuery = () =>
  useFetch<IGetCreditBalanceResponse>(
    createQueryKey(apiRoutes.payment.credits),
    {
      staleTime: 1000 * 60, // 1 min
    }
  );

/**
 * Query hook to check if stripe is enabled for customers
 */
export const useStripeEnabledQuery = () =>
  useFetch<IStripeEnabledResponse>(
    createQueryKey(apiRoutes.payment.stripe.enabled),
    {
      staleTime: 1000 * 60, // 1 min
    }
  );

/**
 * Query hook to get the status of the connected account
 */
export const useConnectedAccountStatusQuery = () =>
  useFetch<IGetConnectedAccountStatusResponse>(
    createQueryKey(apiRoutes.payment.stripe.connect.status),
    {
      staleTime: 1000 * 60, // 1 min
    }
  );

/**
 * Query hook to get current subscription of the logged in user
 */
export const useSubscriptionQuery = () =>
  useFetch<IGetUserSubscriptionResponse>(
    createQueryKey(apiRoutes.payment.subscription),
    {
      staleTime: 1000 * 60, // 1 min
    }
  );

/**
 * Mutation hook to create a subscription checkout session
 * @returns The mutation hook with response type {@link ICheckoutResponse}
 */
export const useSubscriptionCheckoutMutation = () =>
  usePost<ISubscriptionCheckoutRequest, ICheckoutResponse>({
    queryKey: createQueryKey(apiRoutes.payment.checkout.subscription),
  });

/**
 * Mutation hook to create a credits checkout session
 * @returns The mutation hook with response type {@link ICheckoutResponse}
 */
export const useCreditsCheckoutMutation = () =>
  usePost<ICreditsCheckoutRequest, ICheckoutResponse>({
    queryKey: createQueryKey(apiRoutes.payment.checkout.credits),
  });

/**
 * Mutation hook to create a customer portal session
 * @returns The mutation hook with response type {@link ICustomerPortalResponse}
 */
export const useCustomerPortalMutation = () =>
  usePost<ICustomerPortalRequest, ICustomerPortalResponse>({
    queryKey: createQueryKey(apiRoutes.payment.customerPortal),
  });

/**
 * Mutation hook to create a connected account in stripe
 * @returns The mutation hook with response type {@link ICreateStripeConnectedAccountResponse}
 */
export const useCreateStripeConnectedAccountMutation = () =>
  usePost<
    ICreateStripeConnectedAccountRequest,
    ICreateStripeConnectedAccountResponse
  >({
    queryKey: createQueryKey(apiRoutes.payment.stripe.connect.baseUrl),
  });

/**
 * Query hook to get connected account onboarding link
 */
export const useConnectedAccountOnboardingLinkMutation = () =>
  usePost<
    ICreateConnectedAccountOnboardingLinkRequest,
    ICreateConnectedAccountOnboardingLinkResponse
  >({
    queryKey: createQueryKey(apiRoutes.payment.stripe.connect.onboarding),
  });

/** Query hook to get connected account login link */
export const useConnectedAccountLoginLinkMutation = () =>
  usePost<undefined, ICreateConnectedAccountLoginLinkResponse>({
    queryKey: createQueryKey(apiRoutes.payment.stripe.connect.login),
  });
