import axios from "axios";
import mockdate from "mockdate";

import * as accountsAPI from "./accounts";

jest.mock("axios");

mockdate.set("2020-07-05T00:00:00.000Z");

const { RENT_ACCOUNT_API_URL, RENT_ACCOUNT_API_KEY } = process.env;

describe("accounts APIs", () => {
  describe("getAccountDetails", () => {
    const accountFixture = {
      data: {
        accountNumber: "123",
        name: "Bar foobar Foo",
        currentBalance: 66.6,
        rent: 132.62,
        toPay: 9.5,
        hasArrears: false,
        benefits: 123.12,
        isHackneyResponsible: true,
        nextPayment: "Monday 6 July",
        postcode: "ex 1xx",
        tenancyAgreementId: "tag_ref",
      },
    };

    it("should work properly", async () => {
      axios.get.mockResolvedValue(accountFixture);
      const data = await accountsAPI.getAccountDetails(
        {
          accountNumber: "123",
        },
        false
      );

      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(
        `${RENT_ACCOUNT_API_URL}/paymentref/123/privacy/false`
      );
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        "x-api-key": RENT_ACCOUNT_API_KEY,
      });

      expect(data).toEqual({
        accountNumber: "123",
        name: "Bar foobar Foo",
        currentBalance: 66.6,
        rent: 132.62,
        toPay: 9.5,
        hasArrears: false,
        benefits: 123.12,
        isHackneyResponsible: true,
        nextPayment: "Monday 6 July",
        postcode: "ex 1xx",
        tenancyAgreementId: "tag_ref",
      });
    });

    it("should work properly with Arrears", async () => {
      axios.get.mockResolvedValue({
        data: {
          accountNumber: "123",
          name: "Bxx fxxxxx Fxx",
          currentBalance: -9.99,
          rent: 112.62,
          toPay: 123.12,
          hasArrears: true,
          benefits: 123.12,
          isHackneyResponsible: false,
          nextPayment: "Monday 6 July",
          postcode: "ex 1xx",
          tenancyAgreementId: "tag_ref",
        },
      });
      const data = await accountsAPI.getAccountDetails(
        {
          accountNumber: "123",
        },
        true
      );
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(
        `${RENT_ACCOUNT_API_URL}/paymentref/123/privacy/true`
      );
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        "x-api-key": RENT_ACCOUNT_API_KEY,
      });

      expect(data).toEqual({
        accountNumber: "123",
        name: "Bxx fxxxxx Fxx",
        currentBalance: -9.99,
        rent: 112.62,
        toPay: 123.12,
        hasArrears: true,
        benefits: 123.12,
        isHackneyResponsible: false,
        nextPayment: "Monday 6 July",
        postcode: "ex 1xx",
        tenancyAgreementId: "tag_ref",
      });
    });
  });
});
