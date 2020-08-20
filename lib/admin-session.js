import { setCookies, getCookies, removeCookies } from "cookies-next";
import jsonwebtoken from "jsonwebtoken";
import Router from "next/router";

const COOKIE_NAME = "adminSession";
const { GSSO_TOKEN_NAME } = process.env;

const COOKIE_OPTIONS = { maxAge: 7200 };

const redirectToAdminHome = ({ res } = {}) => {
  if (res) {
    res.writeHead(302, {
      Location: "/admin",
    });
    res.end();
  } else {
    Router.push("/admin");
  }
};

const redirectToAdminLogin = ({ res } = {}) => {
  if (res) {
    res.writeHead(302, {
      Location: "/admin/login",
    });
    res.end();
  } else {
    Router.push("/admin/login");
  }
};

const redirectToAcessDenied = ({ res } = {}) => {
  if (res) {
    res.writeHead(302, {
      Location: "/admin/access-denied",
    });
    res.end();
  } else {
    Router.push("/admin/access-denied");
  }
};

export const getAdminSession = (ctx, redirect = true) => {
  try {
    const session = getCookies(ctx, COOKIE_NAME);
    return session
      ? jsonwebtoken.decode(session)
      : redirect && redirectToAdminHome(ctx);
  } catch (e) {
    console.error(e.message);
    redirectToAdminHome(ctx);
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

export const checkIsAdmin = (ctx, redirect = true) => {
  let session = getAdminSession(ctx, false);

  return session && session.isAdmin ? session : checkGSSO(ctx, redirect);
};

export const checkGSSO = (ctx, redirect = true) => {
  const { HACKNEY_JWT_SECRET, ADMIN_USER_GROUP } = process.env;

  let adminAccount = {
    adminName: "",
    isAdmin: false,
  };

  const token = getCookies(ctx, GSSO_TOKEN_NAME);

  try {
    if (token) {
      try {
        let payload = jsonwebtoken.verify(token, HACKNEY_JWT_SECRET);
        const groups = payload.groups;

        // User is authorised if in the group
        if (groups && groups.includes(ADMIN_USER_GROUP)) {
          adminAccount = {
            adminName: payload.name,
            isAdmin: true,
          };

          let session = getAdminSession(ctx, false);
          if (!session) {
            setAdminSession(adminAccount, ctx);
          }

          session = getAdminSession(ctx, false);
        } else {
          redirectToAcessDenied(ctx);
        }
      } catch (err) {
        if (err instanceof jsonwebtoken.JsonWebTokenError) {
          redirectToAdminLogin(ctx);
        } else {
          console.log(err.message);
        }
      }
    }

    return adminAccount.isAdmin
      ? adminAccount
      : redirect && redirectToAdminLogin(ctx);
  } catch (e) {
    console.error(e.message);
    redirectToAdminLogin(ctx);
  }
};
