export const getPrivacyString = (string) =>
  string[0] + string.slice(1).replace(/./gi, "x");
