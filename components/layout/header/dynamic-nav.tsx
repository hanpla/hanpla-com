import { getSessionUser } from "@/lib/utils/auth";
import { SessionProvider } from "@/components/providers/session-provider";
import NavClient from "./nav-client";

const DynamicNav = async () => {
  const user = await getSessionUser();

  return (
    <SessionProvider user={user}>
      <NavClient />
    </SessionProvider>
  );
};

export default DynamicNav;
