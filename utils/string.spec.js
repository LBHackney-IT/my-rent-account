import { getPrivacyString } from "./string";

describe("string util", () => {
  describe("getPrivacyString", () => {
    it("should work properly", () => {
      expect(getPrivacyString("foo bar")).toBe("fxx xxx");
    });
  });
});
