import { getAccount } from "lib/api/accounts";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const data = await getAccount(req.query);
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(404).json("Account Not Found");
        }
      } catch (error) {
        console.log(error.status);
        console.log("Account get error:", error);
        res.status(500).json("Unable to get the account");
      }
      break;

    default:
      res.status(400).json("Invalid request method");
  }
};
