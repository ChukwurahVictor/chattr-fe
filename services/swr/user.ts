import { UserReqParams, getUsers, getUser } from "../axios/user";
import { AxiosError } from "axios";
import urls from "../axios/urls";
import { KeyedMutator } from "swr";
import useSWR from "swr";

export type DataType = {
    users: User[];
};

export const reformData = (data: DataType): User[] =>
    data?.users?.map((d: User) => ({ ...d })) || [];

type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  followedBy: any;
  following: any;
  posts: any;
};

export type SwrCommonResp = {
    isGenerating: boolean;
    isError: AxiosError;
    mutate: KeyedMutator<any>;
};

export type SwrFetchReturnType = SwrCommonResp & {
    data: {
        users: User[];
    };
};

export type SwrFetchSingleReturnType = SwrCommonResp & {
    data: User;
};


export const useFetchUsers = (params?: UserReqParams): SwrFetchReturnType => {
    const fetcher = async () => {
        const response = await getUsers();
        return response?.data.data;
    };
    const { data, error, isLoading, mutate } = useSWR(urls.fetchUsersUrl, fetcher);
    return {
        data,
        isGenerating: isLoading,
        isError: error,
        mutate,
    };
};

export const useFetchSingleUser = (
  id: number,
  params?: UserReqParams
): SwrFetchSingleReturnType => {
  const fetcher = async () => {
    const response = await getUser(id);
    return response?.data.data;
  };
  const { data, error, isLoading, mutate } = useSWR(
    urls.fetchUsersUrl,
    fetcher
  );
  return {
    data,
    isGenerating: isLoading,
    isError: error,
    mutate,
  };
};

