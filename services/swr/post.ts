import { PostReqParams, getPosts, getSinglePost } from "../axios/post";
import { AxiosError } from "axios";
import urls from "../axios/urls";
import { KeyedMutator } from "swr";
import useSWR from "swr";
import { PostType } from "@/types/types"

export type DataType = {
  posts: PostType[];
};

export const reformData = (data: DataType): PostType[] =>
         data?.posts?.map((d: PostType) => ({ ...d })) || [];

export type SwrFetchReturnType = {
  data: PostType[];
  isGenerating: boolean;
  isError: AxiosError;
  mutate: KeyedMutator<any>;
};

export type SwrFetchOneReturnType = {
  data: PostType;
} & Omit<SwrFetchReturnType, "data">;

export const useFetchPosts = (params?: PostReqParams): SwrFetchReturnType => {
  const fetcher = async () => {
    const response = await getPosts(params);
    return response?.data.data;
  };
  const { data, error, isLoading, mutate } = useSWR(
    urls.fetchPostsUrl,
    fetcher
  );
  return {
    data,
    isGenerating: isLoading,
    isError: error,
    mutate,
  };
};

export const useFetchSinglePost = (
  id: string,
  params?: PostReqParams
): SwrFetchOneReturnType => {
  const fetcher = async () => {
    const response = await getSinglePost(id, params);
    return response?.data.data;
  };
  const { data, error, isLoading, mutate } = useSWR(
    urls.fetchSinglePostsUrl,
    fetcher
  );
  return {
    data,
    isGenerating: isLoading,
    isError: error,
    mutate,
  };
};
