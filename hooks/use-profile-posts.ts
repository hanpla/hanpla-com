import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  fetchUserPosts,
  fetchUserComments,
  UserPostsResponse,
  UserCommentsResponse,
} from "@/lib/queries/profile";

export type SubTab = "posts" | "comments";
export type UserActivityResponse = UserPostsResponse | UserCommentsResponse;

const PAGE_SIZE = 10;

const useProfilePosts = (userId: string) => {
  const [subTab, setSubTab] = useState<SubTab>("posts");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const queryClient = useQueryClient();

  const isPosts = subTab === "posts";

  // 1. 동적 단일 useQuery로 통일 (UserActivityResponse 제네릭 타입 지정)
  const { data: activityData, isLoading } = useQuery<UserActivityResponse>({
    queryKey: [isPosts ? "userPosts" : "userComments", userId, currentPage],
    queryFn: () =>
      isPosts ? fetchUserPosts(currentPage, PAGE_SIZE) : fetchUserComments(currentPage, PAGE_SIZE),
  });

  // 2. 다음 페이지 동적 Prefetching 통일
  useEffect(() => {
    if (activityData && activityData.totalCount > currentPage * PAGE_SIZE) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery<UserActivityResponse>({
        queryKey: [isPosts ? "userPosts" : "userComments", userId, nextPage],
        queryFn: () =>
          isPosts ? fetchUserPosts(nextPage, PAGE_SIZE) : fetchUserComments(nextPage, PAGE_SIZE),
      });
    }
  }, [subTab, activityData, userId, currentPage, isPosts, queryClient]);

  const handleSubTabChange = (newTab: SubTab) => {
    if (newTab === subTab) return;
    setSubTab(newTab);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const posts = isPosts ? ((activityData as UserPostsResponse)?.posts ?? []) : [];
  const comments = !isPosts ? ((activityData as UserCommentsResponse)?.comments ?? []) : [];
  const totalCount = activityData?.totalCount ?? 0;

  return {
    subTab,
    currentPage,
    posts,
    comments,
    totalCount,
    pageSize: PAGE_SIZE,
    isLoading,
    handleSubTabChange,
    handlePageChange,
  };
};

export default useProfilePosts;
