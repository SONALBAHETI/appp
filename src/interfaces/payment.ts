export interface ISubscription {
  name: string;
  description: string;
  status: string;
  renewsAt: number;
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
