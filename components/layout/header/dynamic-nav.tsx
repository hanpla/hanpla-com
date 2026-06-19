import { getSessionUser } from "@/lib/utils/auth";
import { UserStoreInitializer } from "@/components/providers/user-store-initializer";
import NavClient from "./nav-client";

const DynamicNav = async () => {
  const user = await getSessionUser();

  return (
    <>
      <UserStoreInitializer user={user} />
      <NavClient />
    </>
  );
};

export default DynamicNav;
