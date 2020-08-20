import React from "react";
import PropTypes from "prop-types";
import { deleteSession, getAdminSession } from "lib/session";

import AdminNavBar from "components/AdminNavBar/AdminNavBar";

export default function AdminHome() {
  return (
    <div>
      <h1>Admin Home Page</h1>
      
      <AdminNavBar />

    </div>
  );
}

AdminHome.propTypes = {

};

export const getServerSideProps = async (ctx) => {
  const logout = ctx.query && ctx.query.logout;

  if (logout) {
    return deleteSession(ctx);
  }

  
  const account = getAdminSession(ctx, true);
  
  return {
    props: {

    },
  };
};
