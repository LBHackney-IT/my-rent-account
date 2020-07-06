import axios from "axios";

import * as authAPI from "lib/api/auth";
import * as accountsAPI from "./accounts";

jest.mock("axios");

jest
  .spyOn(authAPI, "getAuthToken")
  .mockImplementation(() => new Promise((resolve) => resolve("fake-auth")));

const { API_URL } = process.env;

describe("accounts APIs", () => {
  describe("getAccountName", () => {
    const accountFixture = {
      data: {
        "@odata.context":
          "https://lbhackneydev.crm11.dynamics.com/api/data/v8.2/$metadata#accounts(accountid,housing_tag_ref,housing_anticipated,housing_prop_ref,housing_cur_bal,housing_rent,housing_house_ref,housing_directdebit)",
        value: [
          {
            "@odata.etag": 'W/"108028035"',
            accountid: "123",
            housing_tag_ref: "tag_ref",
            housing_anticipated: 123.12,
            housing_prop_ref: "0001",
            housing_cur_bal: 66.6,
            housing_rent: 132.62,
            housing_house_ref: "00007",
            contact1_x002e_hackney_title: "Mr",
            contact1_x002e_hackney_responsible: true,
            contact1_x002e_lastname: "Foo",
            contact1_x002e_firstname: "Bar foobar",
          },
        ],
      },
    };

    it("should work properly", async () => {
      axios.get.mockResolvedValue(accountFixture);
      const data = await accountsAPI.getAccountName({
        accountNumber: "123",
      });
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(API_URL);
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        Authorization: "fake-auth",
      });

      expect(data).toEqual({
        name: "Bxx xxxxxx Fxx",
        currentBalance: "66.60",
        rent: 132.62,
        hasArrears: false,
        isHackneyResponsible: true,
      });
    });

    it("should work properly with Arrears", async () => {
      axios.get.mockResolvedValue({
        data: {
          value: [
            {
              housing_cur_bal: -9.99,
              housing_rent: 132.62,
              contact1_x002e_lastname: "Foo",
              contact1_x002e_firstname: "Bar foobar",
              contact1_x002e_hackney_responsible: false,
            },
          ],
        },
      });
      const data = await accountsAPI.getAccountName({
        accountNumber: "123",
      });
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(API_URL);
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        Authorization: "fake-auth",
      });

      expect(data).toEqual({
        name: "Bxx xxxxxx Fxx",
        currentBalance: "-9.99",
        rent: 132.62,
        hasArrears: true,
        isHackneyResponsible: false,
      });
    });
  });
});
