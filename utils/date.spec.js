import mockdate from "mockdate";

import { getNextMonday } from "./date";
describe("date util", () => {
  afterEach(() => {
    mockdate.reset();
  });

  describe("getNextMonday", () => {
    it("should work properly", () => {
      mockdate.set("2020-07-05T00:00:00.000Z");
      expect(getNextMonday()).toBe("Monday 6 July");
      mockdate.set("2020-07-27T00:00:00.000Z");
      expect(getNextMonday()).toBe("Monday 3 August");
    });
  });
});
