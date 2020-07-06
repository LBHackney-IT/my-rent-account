import { getPaymentUrl } from "lib/urls";

const { URL_PREFIX } = process.env;

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const data = getPaymentUrl({
          sourceUrl: `https://${URL_PREFIX}/account/payment-confirmation?accountNumber=${
            req.query.accountNumber
          }&date=${new Date()}`,
          ...req.query,
        });
        res.status(200).json(data);
      } catch (error) {
        console.log("Application list error:", error);
        res.status(500).json("Unable to list applications");
      }
      break;

    default:
      res.status(400).json("Invalid request method");
  }
};
