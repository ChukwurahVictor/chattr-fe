import { PostReqParams, getPosts, getSinglePost } from "../axios/post";
import { AxiosError } from "axios";
import urls from "../axios/urls";
import { KeyedMutator } from "swr";
import useSWR from "swr";

export type DataType = {
    posts: Post[];
};

export const reformData = (data: DataType): Post[] =>
    data?.posts?.map((d: Post) => ({ ...d })) || [];

type Post = {
    id: number;
    title: string;
    content: string;
    author: {
      firstName: string;
      lastName: string;
    };
    createdAt: string;
};

export type SwrFetchReturnType = {
    data: Post[];
    isGenerating: boolean;
    isError: AxiosError;
    mutate: KeyedMutator<any>;
};

export type SwrFetchOneReturnType = {
  data: Post;
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
  id: number,
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
