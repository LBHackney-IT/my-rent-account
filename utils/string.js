export const getPrivacyString = (string) =>
  string
    .split(" ")
    .map((s) => s && s[0] + s.slice(1).replace(/\w/gi, "x"))
    .join(" ");

export const getProperCurrency = (string) => string && string.replace("¤", "£");
