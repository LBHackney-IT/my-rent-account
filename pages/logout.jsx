import { deleteSession } from "lib/session";

const Logout = () => null;

export const getServerSideProps = async (ctx) => {
  deleteSession(ctx);
  return { props: {} };
};

export default Logout;
