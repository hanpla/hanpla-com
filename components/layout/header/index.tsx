import { getSessionUser } from "@/lib/utils/auth";
import HeaderClient from "./header-client";

const Header = async () => {
  const user = await getSessionUser();

  return <HeaderClient user={user} />;
};

export default Header;



