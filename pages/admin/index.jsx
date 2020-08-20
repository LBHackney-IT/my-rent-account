import React from "react";

import { deleteAdminSession, checkIsAdmin } from "lib/admin-session";

import AdminNavBar from "components/AdminNavBar/AdminNavBar";

export default function AdminHome() {
  return (
    <div>
      <h1>Admin Home Page</h1>
      <AdminNavBar />
    </div>
  );
}

AdminHome.propTypes = {};

export const getServerSideProps = async (ctx) => {
  checkIsAdmin(ctx, true);

  return {
    props: {},
  };
};
