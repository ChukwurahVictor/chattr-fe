import axios from "@/services/axios/interceptor";
import urls from "./urls";

export interface PostReqParams {
    category?: string;
    createdAt?: string;
    startDate?: string;
    endDate?: string;
}

export const cleanedParams = <T>(queryParams: T) => {
    const params: any = {};
    if (queryParams) {
        const keys = Object.keys(queryParams) as Array<keyof T>;
        keys.forEach(key => {
            if (!(queryParams[key] === undefined || queryParams[key] === "")) {
                params[key] = queryParams[key];
            }
        });
    }
    return params;
};

export const getPosts = (params?: PostReqParams) => {
  return axios({
    method: "get",
    url: urls.fetchPostsUrl,
    params: cleanedParams(params),
  });
};

export const getSinglePost = (id: string, params?: PostReqParams) => {
  return axios({
    method: "get",
    url: urls.fetchSinglePostsUrl(id),
    params: cleanedParams(params),
  });
};
