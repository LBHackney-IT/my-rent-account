import React from "react";
import styles from "./AdminNavBar.module.scss";

export default function AdminNavBar() {
  return (
    <div>
      <ul className={styles.AdminNavBar}>
        <li>
          <a href="/admin" className="govuk-link">
            Home
          </a>
        </li>
        <li>
          <a href="/admin" className="govuk-link">
            Manage Users
          </a>
        </li>
        <li>
          <a href="/admin" className="govuk-link">
            My Account
          </a>
        </li>
        <li>
          <a href="/admin/logout" className="govuk-link">
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
