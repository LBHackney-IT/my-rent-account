export const getPrivacyString = (string) =>
  string[0] + string.slice(1).replace(/\w/gi, "x");

export const getProperCurrency = (string) => string && string.replace("¤", "£");
