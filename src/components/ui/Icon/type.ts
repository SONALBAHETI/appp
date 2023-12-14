export const IconType = {
  PLUS: "Plus",
  SEND: "Send",
  HEART: "Heart",
  MORE_VERTICAL: "MoreVertical",
} as const;
export type IconType = (typeof IconType)[keyof typeof IconType];
