import axios from "axios";

import * as transactionsAPI from "./transactions";

jest.mock("axios");

const { RENT_ACCOUNT_API_URL, RENT_ACCOUNT_API_KEY } = process.env;

describe("transactions APIs", () => {
  describe("getTransactions", () => {
    it("should work properly", async () => {
      axios.get.mockResolvedValue({ data: { foo: 123, transactions: "bar" } });
      const data = await transactionsAPI.getTransactions({
        accountNumber: "123",
        postcode: "321",
      });
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(
        `${RENT_ACCOUNT_API_URL}/transactions/payment-ref/123/post-code/321`
      );
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        "x-api-key": RENT_ACCOUNT_API_KEY,
      });
      expect(data).toEqual("bar");
    });
  });
});
