export const baseURL = "http://localhost:3000";

const urls = {  
  // Auth
  login: `${baseURL}/auth/login`,

  // Users
  fetchUsersUrl: `${baseURL}/users`,
  fetchSingleUserUrl: (id: number) => `${baseURL}/users/${id}`,
  
  // Posts
  fetchPostsUrl: `${baseURL}/posts`,
  fetchSinglePostsUrl: (id: number) => `${baseURL}/posts/${id}`,

  // Categories
  fetchCategoriesUrl: `${baseURL}/categories`,
  fetchSingleCategoryUrl: (id: number) => `${baseURL}/categories/${id}`,
};
export default urls;
