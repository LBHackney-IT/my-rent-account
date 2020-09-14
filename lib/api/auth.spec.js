import axios from "axios";

import { getAuthToken } from "lib/api/auth";

jest.mock("axios");

const { CRM_AUTH_URL } = process.env;

describe("auth APIs", () => {
  describe("getAuthToken", () => {
    it("should work properly", async () => {
      axios.get.mockResolvedValue({
        data: "i am the token",
      });
      const data = await getAuthToken();
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(CRM_AUTH_URL);
      expect(data).toEqual("i am the token");
    });
  });
});
