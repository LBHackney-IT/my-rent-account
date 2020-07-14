import { setCookies, getCookies, removeCookies } from "cookies-next";

const COOKIE_NAME = "account";

const redirectToHome = ({ res }) => {
  res.writeHead(302, {
    Location: "/",
  });
  res.end();
};

export const getSession = (ctx, redirect = true) => {
  try {
    const account = getCookies(ctx, COOKIE_NAME);
    return account ? JSON.parse(account) : redirect && redirectToHome(ctx);
  } catch (e) {
    console.error(e.message);
    redirectToHome(ctx);
  }
};

export const setSession = (params, ctx) => {
  setCookies(ctx, COOKIE_NAME, params);
};

export const deleteSession = (ctx) => {
  removeCookies(ctx, COOKIE_NAME);
  redirectToHome(ctx);
};
