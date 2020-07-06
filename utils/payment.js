export const getTransactionType = (code) => {
  switch (code) {
    case "09":
      return "Visa Card";
    default:
      return `(${code}) Other Payment Type`;
  }
};
