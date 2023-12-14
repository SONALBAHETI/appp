const censorPatterns = [
  "\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*", // phone numbers
  "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}", // emails
];

function replaceWithAsterisk(input: string, patterns: string[]) {
  let output = input;
  patterns.forEach((pattern) => {
    const rgx = new RegExp(pattern, "g");
    output = output.replaceAll(rgx, " **** ");
  });
  return output;
}

/**
 * replace all the text that contains personal information
 * like phone numbers or website links with asterisk (*)
 *
 * @param text - The text to be censored
 * @returns censored text
 */
export const censorText = (text: string) => {
  return replaceWithAsterisk(text, censorPatterns);
};
