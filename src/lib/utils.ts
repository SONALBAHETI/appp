import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { compile } from "path-to-regexp";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pathToUrl = (path: string, params: object = {}) =>
  compile(path)(params);

