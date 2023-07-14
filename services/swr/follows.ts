import { UserReqParams, getUsers, getUser } from "../axios/user";
import { AxiosError } from "axios";
import urls from "../axios/urls";
import { KeyedMutator } from "swr";
import useSWR from "swr";
import { FollowType } from "@/types/types";
import { getFollowers, getFollowing } from "../axios/follows";

export type DataType = {
  follows: FollowType[];
};

export const reformData = (data: DataType): FollowType[] =>
  data?.follows?.map((d: FollowType) => ({ ...d })) || [];

export type SwrCommonResp = {
  isGenerating: boolean;
  isError: AxiosError;
  mutate: KeyedMutator<any>;
};

export type SwrFetchReturnType = SwrCommonResp & {
  data: {
    follows: FollowType[];
  };
};

export type SwrFetchSingleReturnType = SwrCommonResp & {
  data: FollowType;
};

export const useFetchFollowers = (id: string) => {
  const fetcher = async () => {
    const response = await getFollowers(id);
    return response?.data.data;
  };
    const { data, error, isLoading, mutate } = useSWR(
        urls.fetchFollowersUrl(id),
        fetcher
    );
    return {
        data,
        isGenerating: isLoading,
        isError: error,
        mutate,
    };
}

export const useFetchFollowing = (id: string) => {
  const fetcher = async () => {
    const response = await getFollowing(id);
    return response?.data.data;
  };
    const { data, error, isLoading, mutate } = useSWR(
        urls.fetchFollowingUrl(id),
        fetcher
    );
    return {
        data,
        isGenerating: isLoading,
        isError: error,
        mutate,
    };
}