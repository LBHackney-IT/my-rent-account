export const getTransactionType = (code) => {
  switch (code) {
    case "09":
      return "Visa card";
    default:
      return `(${code}) other payment type`;
  }
};
