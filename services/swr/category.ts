import { getCategories, getSingleCategory } from "../axios/category";
import { AxiosError } from "axios";
import urls from "../axios/urls";
import { KeyedMutator } from "swr";
import useSWR from "swr";
import { Category } from "@/types/types";

export type DataType = {
  categories: Category[];
};

export const reformData = (data: DataType): Category[] =>
  data?.categories?.map((d: Category) => ({ ...d })) || [];

export type SwrFetchReturnType = {
  data: Category[];
  isGenerating: boolean;
  isError: AxiosError;
  mutate: KeyedMutator<any>;
};

export type SwrFetchOneReturnType = {
  data: Category;
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
  id: string
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
