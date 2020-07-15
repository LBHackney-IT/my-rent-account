import { setCookies, getCookies, removeCookies } from "cookies-next";
import jsonwebtoken from "jsonwebtoken";
import Router from "next/router";

const COOKIE_NAME = "session";

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
    return account
      ? jsonwebtoken.decode(account)
      : redirect && redirectToHome(ctx);
  } catch (e) {
    console.error(e.message);
    redirectToHome(ctx);
  }
};

export const setSession = (params, ctx) => {
  setCookies(
    ctx,
    COOKIE_NAME,
    jsonwebtoken.sign(params, COOKIE_NAME),
    COOKIE_OPTIONS
  );
};

export const updateSession = (params, ctx) => {
  const account = getCookies(ctx, COOKIE_NAME) || "{}";
  setCookies(
    ctx,
    COOKIE_NAME,
    jsonwebtoken.sign(
      {
        ...(account ? jsonwebtoken.decode(account) : {}),
        ...params,
      },
      COOKIE_NAME
    ),
    COOKIE_OPTIONS
  );
};

export const deleteSession = (ctx) => {
  removeCookies(ctx, COOKIE_NAME);
  redirectToHome(ctx);
};
