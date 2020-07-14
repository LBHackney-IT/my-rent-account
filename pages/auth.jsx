import axios from "axios";
import jsonwebtoken from "jsonwebtoken";

import { getSession, updateSession } from "lib/session";
import { postAuditLogin } from "lib/api/audit";
import {
  linkAccount,
  getLinkedAccount,
  getAccountDetails,
} from "lib/api/accounts";

const { CSSO_DOMAIN, CSSO_ID, CSSO_SECRET, URL_PREFIX } = process.env;

const Auth = () => null;

export const getServerSideProps = async (ctx) => {
  const queryString = `?grant_type=authorization_code&client_id=${CSSO_ID}&client_secret=${CSSO_SECRET}&redirect_uri=https://${URL_PREFIX}/auth&code=${ctx.query.code}`;
  const { data } = await axios.post(`${CSSO_DOMAIN}/oauth/token${queryString}`);
  const cssoId = jsonwebtoken.decode(data.id_token).sub;
  const accounts = await getLinkedAccount({ cssoId });
  if (accounts.length === 0) {
    updateSession({ cssoId }, ctx);
    const account = getSession(ctx, false);
    if (!account.accountNumber) {
      ctx.res.writeHead(302, {
        Location: `/link-account`,
      });
    } else {
      const accountDetails = await getAccountDetails({
        accountNumber: accounts.accountNumber,
      });
      await linkAccount(account);
      await postAuditLogin(accountDetails);
      ctx.res.writeHead(302, {
        Location: `/account`,
      });
    }
    ctx.res.end();
  } else {
    const accountDetails = await getAccountDetails({
      accountNumber: accounts[0].rent_account_number,
    });
    const { postcode, accountNumber } = accountDetails;
    await postAuditLogin(accountDetails);
    updateSession({ cssoId, accountNumber, postcode }, ctx);
    ctx.res.writeHead(302, {
      Location: `/account`,
    });
    ctx.res.end();
  }
  return {
    props: {},
  };
};

export default Auth;
