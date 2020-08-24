import React from "react";
import { checkIsAdmin, redirectToAdminLogin } from "lib/admin-session";
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
  const isAdmin = checkIsAdmin(ctx);

  if (!isAdmin) {
    redirectToAdminLogin(ctx);
  }

  return {
    props: {},
  };
};
