import { getCategories, getSingleCategory } from "../axios/category";
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

export const useFetchCategories = () => {
  const fetcher = async () => {
    const response = await getCategories();
    return response?.data.data;
  };
  const { data, error, isLoading, mutate } = useSWR(
    urls.fetchCategoriesUrl,
    fetcher
  );
  return {
    data,
    isGenerating: isLoading,
    isError: error,
    mutate,
  };
};

export const useFetchSingleCategory = (
  id: number
): SwrFetchOneReturnType => {
  const fetcher = async () => {
    const response = await getSingleCategory(id);
    return response?.data.data;
  };
  const { data, error, isLoading, mutate } = useSWR(
    urls.fetchSingleCategoryUrl,
    fetcher
  );
  return {
    data,
    isGenerating: isLoading,
    isError: error,
    mutate,
  };
};
