import { getPrivacyString, getProperCurrency } from "./string";

describe("string util", () => {
  describe("getPrivacyString", () => {
    it("should work properly", () => {
      expect(getPrivacyString("foo bar")).toBe("fxx bxx");
    });
  });

  describe("getProperCurrency", () => {
    it("should work properly", () => {
      expect(getProperCurrency("¤123")).toBe("£123");
    });
  });
});
