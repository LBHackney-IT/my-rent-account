import axios from "axios";

import * as authAPI from "lib/api/auth";
import * as auditAPI from "./audit";

jest.mock("axios");

jest
  .spyOn(authAPI, "getAuthToken")
  .mockImplementation(() => new Promise((resolve) => resolve("fake-auth")));

const { API_URL } = process.env;

describe("audit APIs", () => {
  describe("postAuditLogin", () => {
    it("should work properly", async () => {
      await auditAPI.postAuditLogin({
        accountNumber: "123",
        postcode: "123",
        tagReference: "foo",
      });
      expect(axios.post).toHaveBeenCalled();
      expect(axios.post.mock.calls[0][0]).toEqual(
        `${API_URL}/hackney_housingaccountaudits( )`
      );
      expect(axios.post.mock.calls[0][1]).toEqual({
        hackney_accountnumber: "123",
        hackney_accounttype: "1",
        hackney_name: "Rent Account Audit History",
        hackney_postcode: "123",
        hackney_tagreferencenumber: "foo",
      });
      expect(axios.post.mock.calls[0][2].headers).toEqual({
        Authorization: "fake-auth",
        "Content-Type": "application/json",
      });
    });
  });
});
