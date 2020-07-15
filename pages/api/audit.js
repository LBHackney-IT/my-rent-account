import { postAuditLogin } from "lib/api/audit";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        await postAuditLogin(req.body);
        res.status(204).end();
      } catch (error) {
        console.log(error.status);
        console.log("Audit get error:", error);
        res.status(500).json("Unable to post Audit");
      }
      break;

    default:
      res.status(400).json("Invalid request method");
  }
};
