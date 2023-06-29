import axios from "@/services/axios/interceptor";
import urls from "./urls";

export interface UserReqParams {
    firstname: string;
    lastname: string;
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

export const getUsers = (params?: UserReqParams) => {
    return axios({
        method: "get",
        url: urls.fetchUsersUrl,
        params: cleanedParams(params),
    });
};

export const getUser = (id: string) => {
    return axios({
      method: "get",
      url: urls.fetchSingleUserUrl(id),
    });
};
