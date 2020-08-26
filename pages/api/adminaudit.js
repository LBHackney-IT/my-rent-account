import { postAdminAudit } from "lib/api/audit";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        const body = req.body;

        const adminAuditParams = {
          user: body.user,
          accountNumber: body.accountNumber,
          cssoLogin: body.simulateCSSO ? true : false,
          auditAction: body.auditAction || "VIEW",
        };

        console.log(adminAuditParams);

        await postAdminAudit(adminAuditParams);
        res.status(204).end();
      } catch (error) {
        console.log(error.status);
        console.log("Admin audit error:", error);
        res.status(500).json("Unable to post Admin Audit");
      }
      break;

    default:
      res.status(400).json("Invalid request method");
  }
};
