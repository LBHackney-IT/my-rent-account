import { setCookies, getCookies, removeCookies } from "cookies-next";
import jsonwebtoken from "jsonwebtoken";
import Router from "next/router";
import { redirectToHome } from "lib/session";

const COOKIE_NAME = "adminSession";
const { GSSO_TOKEN_NAME } = process.env;

const COOKIE_OPTIONS = { maxAge: 7200 };

export const redirectToAdminHome = ({ res } = {}) => {
  if (res) {
    res.writeHead(302, {
      Location: "/admin",
    });
    res.end();
  } else {
    Router.push("/admin");
  }
};

export const redirectToAdminLogin = ({ res } = {}) => {
  if (res) {
    res.writeHead(302, {
      Location: "/admin/login",
    });
    res.end();
  } else {
    Router.push("/admin/login");
  }
};

export const redirectToAcessDenied = ({ res } = {}) => {
  if (res) {
    res.writeHead(302, {
      Location: "/admin/access-denied",
    });
    res.end();
  } else {
    Router.push("/admin/access-denied");
  }
};

export const setAdminSession = (params, ctx) => {
  setCookies(
    ctx,
    COOKIE_NAME,
    jsonwebtoken.sign(params, COOKIE_NAME),
    COOKIE_OPTIONS
  );
};

export const getAdminSession = (ctx) => {
  try {
    const cookie = getCookies(ctx, COOKIE_NAME);

    return cookie ? jsonwebtoken.decode(cookie) : "";
  } catch (e) {
    console.error(e.message);
    return {};
  }
};

export const updateAdminSession = (params, ctx) => {
  const session = getCookies(ctx, COOKIE_NAME) || "{}";
  setCookies(
    ctx,
    COOKIE_NAME,
    jsonwebtoken.sign(
      {
        ...(session ? jsonwebtoken.decode(session) : {}),
        ...params,
      },
      COOKIE_NAME
    ),
    COOKIE_OPTIONS
  );
};

export const deleteAdminSession = (ctx) => {
  removeCookies(ctx, COOKIE_NAME);
  removeCookies(ctx, GSSO_TOKEN_NAME);
  redirectToAdminLogin(ctx);
};

export const checkIsAdmin = (ctx) => {
  const session = getAdminSession(ctx);

  return session && session.isAdmin ? true : false;
};

export const checkGSSO = (ctx) => {
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
            userName: payload.name,
            isAdmin: true,
          };

          setAdminSession(gssoAccount, ctx);
          adminSession = getAdminSession(ctx);
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
