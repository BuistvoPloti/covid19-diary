import { combineReducers } from "redux";

import userReducer from "./Users/user.reducer";
import postsReducer from "./Posts/posts.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer
});

export default rootReducer;
