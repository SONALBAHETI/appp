import {
  ICreditsCheckoutRequest,
  ISubscriptionCheckoutRequest,
  ICheckoutResponse,
  IGetCreditBalanceResponse,
  IGetUserSubscriptionResponse,
} from "@/interfaces/payment";
import { useFetch, usePost } from "@/lib/react-query";
import { createQueryKey } from "@/lib/react-query/utils";
import { apiRoutes } from "./routes";

/**
 * Query hook to get credit balance of the logged in user
 */
export const useCreditBalanceQuery = () =>
  useFetch<IGetCreditBalanceResponse>(
    createQueryKey(apiRoutes.payment.credits)
  );

/**
 * Query hook to get current subscription of the logged in user
 */
export const useSubscriptionQuery = () =>
  useFetch<IGetUserSubscriptionResponse>(
    createQueryKey(apiRoutes.payment.subscription)
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
