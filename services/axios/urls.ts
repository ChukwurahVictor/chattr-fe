export const baseURL = /*"https://chatter-be.onrender.com"*/"http://localhost:3000";

const urls = {
  // Auth
  login: `${baseURL}/auth/login`,
  signup: `${baseURL}/auth/signup`,
  logout: `${baseURL}/auth/logout`,

  // Users
  fetchUsersUrl: `${baseURL}/users`,
  fetchSingleUserUrl: (id: string) => `${baseURL}/users/${id}`,

  // Posts
  fetchPostsUrl: `${baseURL}/posts`,
  fetchSinglePostsUrl: (id: string) => `${baseURL}/posts/${id}`,

  // Categories
  fetchCategoriesUrl: `${baseURL}/categories`,
  fetchSingleCategoryUrl: (id: string) => `${baseURL}/categories/${id}`,

  // Follows
  followsUrl: `${baseURL}/follows`,
  fetchFollowersUrl: (id: string) => `${baseURL}/follows/${id}/followers`,
  fetchFollowingUrl: (id: string) => `${baseURL}/follows/${id}/following`,
};
export default urls;
