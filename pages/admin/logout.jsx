import { deleteAdminSession } from "lib/admin-session";

const Logout = () => null;

export const getServerSideProps = async (ctx) => {
  deleteAdminSession(ctx);
  return { props: {} };
};

export default Logout;
