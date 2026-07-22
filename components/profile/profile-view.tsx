"use client";

import { useState } from "react";

import type { SessionUser } from "@/types/auth";
import type { ProfileTabType } from "@/types/profile";
import ProfileInfoSection from "./profile-info-section";
import ProfilePostsSection from "./profile-posts-section";

interface ProfileViewProps {
  user: SessionUser;
}

interface TabItem {
  id: ProfileTabType;
  label: string;
}

const TABS: TabItem[] = [
  { id: "posts", label: "글 목록" },
  { id: "info", label: "내 정보" },
];

const ProfileTabNav = ({
  activeTab,
  onSelectTab,
}: {
  activeTab: ProfileTabType;
  onSelectTab: (tab: ProfileTabType) => void;
}) => {
  return (
    <nav className="flex w-full border-b border-zinc-200 md:w-56 md:flex-col md:border-r md:border-b-0 dark:border-zinc-800">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`cursor-pointer px-4 py-3 text-left text-sm font-semibold transition-colors ${
              isActive
                ? "border-b-2 border-zinc-900 text-zinc-900 md:border-b-0 md:border-l-2 md:bg-zinc-100/60 dark:border-zinc-100 dark:text-zinc-100 dark:md:bg-zinc-800/40"
                : "text-zinc-500 hover:text-zinc-900 md:border-l-2 md:border-transparent dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};

const ProfileView = ({ user }: ProfileViewProps) => {
  const [activeTab, setActiveTab] = useState<ProfileTabType>("posts");

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
      <ProfileTabNav activeTab={activeTab} onSelectTab={setActiveTab} />
      <div className="flex-1">
        {activeTab === "posts" ? <ProfilePostsSection /> : <ProfileInfoSection user={user} />}
      </div>
    </div>
  );
};

export default ProfileView;
