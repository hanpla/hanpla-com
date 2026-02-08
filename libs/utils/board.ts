// Types
type Params = Promise<{ abbr: string }>;
type SearchParams = Promise<{ [key: string]: string | undefined }>;

export const getBoardParams = async (
  params: Params,
  searchParams: SearchParams,
) => {
  const [{ abbr }, search] = await Promise.all([params, searchParams]);

  const normalizedSearch = {
    page: Number(search.page || 1),
    likeCount: Number(search.likeCount || 0),
    searchType: search.searchType,
    postSearch: search.postSearch,
  };

  return { abbr, search: normalizedSearch };
};
