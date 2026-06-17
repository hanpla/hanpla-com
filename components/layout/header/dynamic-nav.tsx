import { getSessionUser } from "@/lib/utils/auth";
import { UserStoreProvider } from "@/components/providers/user-store-provider";
import NavClient from "./nav-client";

const DynamicNav = async () => {
  const user = await getSessionUser();

  return (
    <UserStoreProvider initialUser={user}>
      <NavClient />
    </UserStoreProvider>
  );
};

export default DynamicNav;


