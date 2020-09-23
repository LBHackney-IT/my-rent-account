import {
  getAccount,
  getLinkedAccount,
  linkAccount,
  unlinkAccount,
} from "lib/api/accounts";

export default async (req, res) => {
  const { accountNumber, cssoId, postcode } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const data = await getLinkedAccount({ cssoId });
        res.status(200).json(data);
      } catch (error) {
        console.log("Get Link Account error:", error);
        res.status(500).json(error);
      }
      break;
    case "POST":
      try {
        await getAccount({ accountNumber, postcode });
        const data = await linkAccount({ accountNumber, cssoId });
        res.status(200).json(data);
      } catch (error) {
        console.log("Link Account error:", error);
        res.status(500).json(error);
      }
      break;
    case "DELETE":
      try {
        const accounts = await getLinkedAccount({ cssoId });
        const linkedAccount =
          accounts &&
          accounts.find(
            ({ rent_account_number }) => rent_account_number === accountNumber
          );
        if (!linkedAccount) {
          res.status(404).end();
        } else {
          await unlinkAccount({
            cssoId: linkedAccount.csso_id,
          });
          res.status(204).end();
        }
      } catch (error) {
        console.log("Unlink Account error:", error);
        res.status(500).json(error);
      }
      break;
    default:
      res.status(400).json("Invalid request method");
  }
};
