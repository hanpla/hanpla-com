export interface BoardType {
  name: string;
  abbr: string;
}

export interface PostListType {
  id: number;
  title: string;
  boardName: string;
  abbr: string;
  nickname: string;
  views: number;
  comments: number;
  likes: number;
  isLogin: boolean;
  ip: string;
  createdAt: string;
}

export interface GetPostListResult {
  postList: PostListType[];
  totalCount: number;
}

export interface AbbrSearchParams {
  page: number;
  likeCount: number;
  searchType: string | undefined;
  postSearch: string | undefined;
}
