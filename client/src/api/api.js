import * as axios from "axios";
// import { config } from "../config";

const axiosIns = (url) =>
  axios.create({
    withCredentials: true,
    baseURL: url,
  });

// const {
//   api: {
//     repositories_url,
//     notes_url,
//     github_repositories_url,
//     logout_url,
//   },
//   app: {
//     github_user_url
//   }
// } = config;

export const repositoriesAPI = {
  // getRepositories(isAuth = false) {
  //   return instance(
  //     isAuth ? github_repositories_url : repositories_url
  //   )
  //     .get()
  //     .then((response) => {
  //       return response.data.repositories;
  //     });
  // },
  // deleteRepositories(repository_id) {
  //   return instance(repositories_url).delete(`/${repository_id}`);
  // },
  // createRepositoryRequest(repository) {
  //   return instance(repositories_url).post(`/`, repository);
  // },
};

const source = "http://localhost:3022";

export const postsAPI = {
  getUserPosts(userId) {
    return axiosIns(source).get(`/posts/owner/${userId}`)
  },
  createPost(postData) {
    return axiosIns(source).post('/posts', { ...postData })
  }
}

//http://localhost:3022/users/qqq/60424b201874e92044af02e6
export const usersAPI = {
  getUser(userId) {
    return axiosIns(source).get(`/users/qqq/${userId}`)
  },
}


export const authAPI = {
  login(login, password) {
    return axiosIns(source).post("/users/signin", { login, password });
  },
  register(login, email, password) {
    return axiosIns(source).post("users/signup", { login, email, password });
  },
  logout() {
    return axiosIns(source).delete("/users/signout");
  },
};
