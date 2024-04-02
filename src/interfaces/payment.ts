export interface ISubscriptionCheckoutRequest {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface ISubscriptionCheckoutResponse {
  sessionUrl: string;
}