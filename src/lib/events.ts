/**
 * Creates a custom event with optional data payload.
 *
 * @param {string} eventName - The name of the event
 * @param {TData} [data] - Optional data payload for the event
 * @return {Event | CustomEvent<TData>} The created event or custom event
 */
export const createCustomEvent = function <TData = { [key: string]: string }>(
  eventName: string,
  data?: TData
): Event | CustomEvent<TData> {
  if (data) {
    return new CustomEvent<TData>(eventName, { detail: data });
  }
  return new Event(eventName);
};
