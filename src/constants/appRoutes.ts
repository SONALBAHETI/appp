export const AppRoutes = {
  Root: {
    path: "/",
  },
  Auth: {
    Signin: {
      path: "/signin",
    },
    Signup: {
      path: "/signup",
    },
  },
  Verification: {
    PasswordReset: {
      path: "/verification/password-reset",
      Request: {
        path: "/verification/password-reset/request",
      },
    },
    Email: {
      path: "/verification/email",
      Request: {
        path: "/verification/email/request",
      }
    }
  },
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
      Notifications: {
        path: "/settings/account/notifications",
      },
      ChangePassword: {
        path: "/settings/account/change-password",
      },
      Delete: {
        path: "/settings/account/delete",
      }
    },
    Profile: {
      path: "/settings/profile",
      PersonalDetails: {
        path: "/settings/profile/personal-details",
      },
      StudentVerification: {
        path: "/settings/profile/student-verification",
      },
      BankDetails: {
        path: "/settings/profile/bank-details",
      },
      CertificationsAndBadges: {
        path: "/settings/profile/certifications-and-badges",
      }
    },
    Appointment: {
      path: "/settings/appointment",
      AppointmentSettings: {
        path: "/settings/appointment/appointment-settings",
      },
      CalendarSync: {
        path: "/settings/appointment/calendar-sync",
      }
    },
    Transactions: {
      path: "/settings/transactions",
    },
    ReferAndEarn: {
      path: "/settings/refer-earn",
    },
    FeedbackSupport: {
      path: "/settings/feedback-support",
    }
  },
  Stripe: {
    Onboarding: {
      path: "/stripe/onboarding",
    },
  },
  Onboarding: {
    path: "/onboarding",
  },
  Dashboard: {
    path: "/dashboard",
  },
  Chat: {
    path: "/chat",
  },
  Chatbot: {
    path: "/chatbot",
  },
  Notes: {
    path: "/notes",
  },
  Matches: {
    path: "/matches",
  }
};

/**
 * Returns the full route with frontend base url prefix.
 * @param relativeRoute - The relative app route.
 * @returns The full route with frontend base url prefix.
 */
export const getFullRoute = (relativeRoute?: string) =>
  `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}${relativeRoute || ""}`;
