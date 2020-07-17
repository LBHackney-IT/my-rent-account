import { getPrivacyString, getProperCurrency, getProperValue } from "./string";

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

  describe("getProperValue", () => {
    it("should work properly", () => {
      expect(getProperValue("(£111.48)")).toBe("-£111.48");
      expect(getProperValue("£123")).toBe("£123");
      expect(getProperValue("(123)")).toBe("-123");
    });
  });

  describe("getProperValue", () => {
    it("should work properly", () => {
      expect(getProperValue("(£111.48)")).toBe("-£111.48");
      expect(getProperValue("£123")).toBe("£123");
      expect(getProperValue("(123)")).toBe("-123");
    });
  });
});
