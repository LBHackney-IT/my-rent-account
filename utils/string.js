export const getPrivacyString = (string) =>
  string
    .split(" ")
    .map((s) => s && s[0] + s.slice(1).replace(/\w/gi, "x"))
    .join(" ");

export const getProperCurrency = (string) => string && string.replace("¤", "£");

const MATCH_PARENTHESES = new RegExp(/\(([^)]+)\)/);

export const getProperValue = (string) => {
  const value = string.match(MATCH_PARENTHESES);
  return value ? `-${value[1]}` : string;
};
