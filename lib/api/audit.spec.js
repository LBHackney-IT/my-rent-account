import axios from "axios";

import * as auditAPI from "./audit";

jest.mock("axios");

const { RESIDENT_AUDIT_API_URL, RENT_ACCOUNT_API_KEY } = process.env;

describe("audit APIs", () => {
  describe("postAuditLogin", () => {
    it("should work properly", async () => {
      await auditAPI.postAuditLogin({
        accountNumber: "123",
        postcode: "123",
        cssoId: "123",
      });
      expect(axios.post).toHaveBeenCalled();
      expect(axios.post.mock.calls[0][0]).toEqual(RESIDENT_AUDIT_API_URL);
      expect(axios.post.mock.calls[0][1]).toEqual({
        RentAccountNumber: "123",
        PostCode: "123",
        LoggedIn: true,
      });
      expect(axios.post.mock.calls[0][2].headers).toEqual({
        "Content-Type": "application/json",
        "x-api-key": RENT_ACCOUNT_API_KEY,
      });
    });
  });
});
