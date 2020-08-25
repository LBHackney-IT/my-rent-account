import { setCookies, getCookies, removeCookies } from "cookies-next";
import jsonwebtoken from "jsonwebtoken";
import Router from "next/router";

const COOKIE_NAME = "session";
const { GSSO_TOKEN_NAME } = process.env;
const COOKIE_OPTIONS = { maxAge: 7200 };

export const redirectToHome = ({ res } = {}) => {
  if (res) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
  } else {
    Router.push("/");
  }
};

export const redirectToAdminLogin = ({ res } = {}) => {
  if (res) {
    res.writeHead(302, {
      Location: "/admin"
    });
    res.end();
  } else {
    Router.push("/admin");
  }
};

export const redirectToAcessDenied = ({ res } = {}) => {
  if (res) {
    res.writeHead(302, {
      Location: "/access-denied",
    });
    res.end();
  } else {
    Router.push("/access-denied");
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

export const checkIsAdmin = (ctx) => {
  const session = getSession(ctx);

  return session && session.isAdmin ? true : false;
};

export const checkAdminGSSO = (ctx) => {
  const { HACKNEY_JWT_SECRET, ADMIN_USER_GROUP } = process.env;

  let gssoAccount = {
    userName: "",
    isAdmin: false,
  };

  let adminSession = "";

  const token = getCookies(ctx, GSSO_TOKEN_NAME);

  try {
    if (token) {
      try {
        let payload = jsonwebtoken.verify(token, HACKNEY_JWT_SECRET);
        const groups = payload.groups;

        // User is authorised if in the group
        if (groups && groups.includes(ADMIN_USER_GROUP)) {
          gssoAccount = {
            cssoId: payload.sub,
            userName: payload.name,
            isAdmin: true,
          };

          setSession(gssoAccount, ctx);
          adminSession = getSession(ctx);
        } else {
          redirectToAcessDenied(ctx);
        }
      } catch (err) {
        if (err instanceof jsonwebtoken.JsonWebTokenError) {
          redirectToHome(ctx);
        } else {
          console.log(err.message);
        }
      }
    }

    return adminSession;
  } catch (e) {
    console.error(e.message);
    redirectToHome(ctx);
  }
};