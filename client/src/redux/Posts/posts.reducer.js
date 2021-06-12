import { SET_POSTS, ADD_POST } from "./posts.types";
import {addPost, setPosts} from "./posts.actions";
import { postsAPI } from "../../api/api";

// {
//   "fever": null,
//   "dry_cough": null,
//   "tiredness": null,
//   "chest_pain_or_pressure": null,
//   "loss_of_taste_or_smell": null,
//   "difficulty_breathing": null,
//   "sore_throat": null,
//   "conjunctivitis": null,
//   "headache": null,
//   "vomiting": null,
//   "fatigue": null,
//   "chills": null,
//   "rash": null,
//   "nausea": null,
//   "comment": null,
//   "user_id": null,
//   "reactions": null,
//   "createdAt": null,
//   "updatedAt": null,
//   "id": null
// }

const initialState = {
  posts: [],
  postsCount: null,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: [...action.payload], //...state.posts,
        postsCount: action.payload.length
      }
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    default:
      return state;
  }
};

// thunks

export const getUserPosts = (userId) => async (dispatch) => {
  const postsResponse = await postsAPI.getUserPosts(userId);
  if (postsResponse.status === 200) {
    const posts = postsResponse.data.data.posts;
    dispatch(setPosts(posts));
   }
};

export const createPost = (postData) => async (dispatch) => {
  const postResponse = await postsAPI.createPost(postData);
  if (postResponse.status === 200) {
    const post = postResponse.data.data.post;
    dispatch(addPost(post));
   }
};

export default postsReducer;
