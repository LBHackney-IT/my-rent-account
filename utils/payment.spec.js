import { getTransactionType } from "./payment";

describe("payment util", () => {
  describe("getTransactionType", () => {
    it("should work properly", () => {
      expect(getTransactionType("09")).toBe("Visa card");
      expect(getTransactionType("XX")).toBe("(XX) other payment type");
    });
  });
});
