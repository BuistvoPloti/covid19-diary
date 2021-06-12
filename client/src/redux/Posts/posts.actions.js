import {ADD_POST, SET_POSTS} from "./posts.types";

export const setPosts = (posts) => {
  return {
    type: SET_POSTS,
    payload: posts,
  };
};

export const addPost = (post) => {
  return {
    type: ADD_POST,
    payload: post,
  };
};
