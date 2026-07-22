import { redirect } from "next/navigation";

import { getSessionUser } from "@/lib/utils/auth";
import PageTitle from "@/components/ui/page-title";
import ProfileView from "@/components/profile/profile-view";

const ProfilePage = async () => {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login?callbackUrl=/profile");
  }

  return (
    <div className="space-y-6">
      <PageTitle title="마이페이지" />
      <ProfileView user={user} />
    </div>
  );
};

export default ProfilePage;
