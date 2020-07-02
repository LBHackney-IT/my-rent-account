import { getAccount } from "lib/api/accounts";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        const data = await getAccount(req.query);
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
