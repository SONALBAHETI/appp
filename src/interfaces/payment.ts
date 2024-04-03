type ISubscriptionStatus =
  | "incomplete"
  | "incomplete_expired"
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "unpaid"
  | "paused";

export interface ISubscription {
  name: string;
  description: string;
  status: ISubscriptionStatus;
  currentPeriodEnd: number | null;
  cancelAt: number | null;
  endedAt: number | null;
}

export interface IGetCreditBalanceResponse {
  credits: number;
}

export interface IGetUserSubscriptionResponse {
  subscription: ISubscription | null;
}

export interface ICreditsCheckoutRequest {
  quantity: number;
  successUrl: string;
  cancelUrl: string;
}

export interface ISubscriptionCheckoutRequest {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface ICheckoutResponse {
  sessionUrl: string;
}

export interface ICustomerPortalRequest {
  returnUrl: string;
}

export interface ICustomerPortalResponse {
  sessionUrl: string;
}

export interface ICreateStripeConnectedAccountRequest {
  returnUrl: string;
  refreshUrl: string;
}

export interface ICreateStripeConnectedAccountResponse {
  onboardingUrl: string;
}

export interface ICreateConnectedAccountOnboardingLinkRequest {
  returnUrl: string;
  refreshUrl: string;
}

export interface ICreateConnectedAccountOnboardingLinkResponse {
  onboardingUrl: string;
}

export interface ICreateConnectedAccountLoginLinkResponse {
  loginUrl: string;
}

export interface IGetConnectedAccountStatusResponse {
  created: boolean;
  verified: boolean;
}

export interface IStripeEnabledResponse {
  enabled: boolean;
}
