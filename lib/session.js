import { setCookies, getCookies, removeCookies } from "cookies-next";
import jsonwebtoken from "jsonwebtoken";
import Router from "next/router";

const COOKIE_NAME = "session";
const { GSSO_TOKEN_NAME } = process.env;

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
  removeCookies(ctx, GSSO_TOKEN_NAME);
  redirectToHome(ctx);
};

export const checkIsAdmin = (ctx, redirect = true) => {
  let account = getSession(ctx, false);

  return account && account.isAdmin 
    ? account 
    : redirect && redirectToAdminLogin(ctx);
};

export const getAdminSession = (ctx, redirect = false ) => {
  const { GSSO_TOKEN_NAME, HACKNEY_JWT_SECRET, ADMIN_USER_GROUP } = process.env;

  let adminAccount = {
    adminName: '',
    isAdmin: false
  };

  try {
    let account = getSession(ctx, false);

    if (!account) {
      setSession({}, ctx);
      account = getSession(ctx, false);
    }

    if (account && !account.isAdmin) {
      const token = getCookies(ctx, GSSO_TOKEN_NAME);

      if (token) {
        let payload = null;
    
        try {
          payload = jsonwebtoken.verify(token, HACKNEY_JWT_SECRET);
          const groups = payload.groups;

          // User is authorised if in the group
          if(groups && groups.includes(ADMIN_USER_GROUP)) {
            adminAccount = {
              adminName: payload.name,
              isAdmin: true
            }

            updateSession(adminAccount, ctx);
            account = getSession(ctx, false);
          };
    
        } catch (err) {
            if (err instanceof jsonwebtoken.JsonWebTokenError) {
              return res.status(401).redirect("login.njk");
            } else {
              console.log(err.message);
            }
        }
      }
    }
    
    return account.isAdmin
      ? account
      : redirect && redirectToAdminLogin(ctx);
  } catch (e) {
    console.error(e.message);
    redirectToHome(ctx);
  }
};
