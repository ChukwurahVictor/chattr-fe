import axios from "@/services/axios/interceptor";
import urls from "./urls";

export const getFollowers = (id: string) => {
  return axios({
    method: "get",
    url: urls.fetchFollowersUrl(id),
  });
};

export const getFollowing = (id: string) => {
    return axios({
        method: "get",
        url: urls.fetchFollowingUrl(id),
    })
};