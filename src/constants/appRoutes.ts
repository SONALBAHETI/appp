export const AppRoutes = {
  Settings: {
    path: "/settings",
    Account: {
      path: "/settings/account",
      QuickReplies: {
        path: "/settings/account/quick-replies",
      },
      Subscription: {
        path: "/settings/account/subscription",
      },
      Payout: {
        path: "/settings/account/payout",
      },
    },
  },
  Stripe: {
    Onboarding: {
      path: "/stripe/onboarding",
    },
  },
};

/**
 * Returns the full route with frontend base url prefix.
 * @param relativeRoute - The relative app route.
 * @returns The full route with frontend base url prefix.
 */
export const getFullRoute = (relativeRoute?: string) =>
  `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}${relativeRoute || ""}`;
