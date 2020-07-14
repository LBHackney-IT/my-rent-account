import { setCookies, getCookies, removeCookies } from "cookies-next";
import Router from "next/router";

const COOKIE_NAME = "account";

const COOKIE_OPTIONS = { maxAge: 7200 };

const redirectToHome = ({ res } = {}) => {
  if (res) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
  } else {
    Router.push("/");
  }
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
  setCookies(ctx, COOKIE_NAME, params, COOKIE_OPTIONS);
};

export const updateSession = (params, ctx) => {
  const account = getCookies(ctx, COOKIE_NAME) || "{}";
  setCookies(
    ctx,
    COOKIE_NAME,
    {
      ...(account ? JSON.parse(account) : {}),
      ...params,
    },
    COOKIE_OPTIONS
  );
};

export const deleteSession = (ctx) => {
  removeCookies(ctx, COOKIE_NAME);
  redirectToHome(ctx);
};
