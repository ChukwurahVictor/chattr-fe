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

export const getCategories = () => {
  return axios({
    method: "get",
    url: urls.fetchCategoriesUrl
  });
};

export const getSingleCategory = (id: string) => {
  return axios({
    method: "get",
    url: urls.fetchSingleCategoryUrl(id),
  });
};
