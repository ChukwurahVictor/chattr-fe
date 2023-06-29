export const baseURL = "https://chatter-be.onrender.com";

const urls = {  
  // Auth
  login: `${baseURL}/auth/login`,

  // Users
  fetchUsersUrl: `${baseURL}/users`,
  fetchSingleUserUrl: (id: string) => `${baseURL}/users/${id}`,
  
  // Posts
  fetchPostsUrl: `${baseURL}/posts`,
  fetchSinglePostsUrl: (id: string) => `${baseURL}/posts/${id}`,

  // Categories
  fetchCategoriesUrl: `${baseURL}/categories`,
  fetchSingleCategoryUrl: (id: string) => `${baseURL}/categories/${id}`,
};
export default urls;
