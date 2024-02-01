"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { useDebounce } from "usehooks-ts";

/**
 * Debounces the search term input with a specified delay.
 *
 * @param {number} delay - the delay in milliseconds (default is 500)
 * @param {string} initialSearchTerm - the search term input (default is empty string)
 * @return {[string, Dispatch<SetStateAction<string>>, string]} the debounced search term
 */
const useDebouncedSearchTerm = (
  delay: number = 500,
  initialSearchTerm: string = "",
): [string, Dispatch<SetStateAction<string>>, string] => {
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const debouncedSearchTerm = useDebounce<string>(searchTerm || "", delay);
  return [searchTerm, setSearchTerm, debouncedSearchTerm];
};
export default useDebouncedSearchTerm;
