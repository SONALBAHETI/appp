import {
  ISubscriptionCheckoutRequest,
  ISubscriptionCheckoutResponse,
} from "@/interfaces/payment";
import { usePost } from "@/lib/react-query";
import { createQueryKey } from "@/lib/react-query/utils";
import { apiRoutes } from "./routes";

/**
 * Mutation hook to create a subscription checkout session
 * @returns The mutation hook with response type {@link ISubscriptionCheckoutResponse}
 */
export const useSubscriptionCheckoutMutation = () =>
  usePost<ISubscriptionCheckoutRequest, ISubscriptionCheckoutResponse>({
    queryKey: createQueryKey(apiRoutes.payment.subscription.checkout),
  });
