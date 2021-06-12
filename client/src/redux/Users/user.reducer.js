import { SET_USER_DATA } from "./user.types";
import { setAuthUserData } from "./user.actions";
import { authAPI } from "../../api/api";

const initialState = {
  id: null,
  login: null,
  email: null,
  cured_at: null,
  cured: null,
  infected: null,
  vaccinated: null,
  followed_users: null,
  createdAt: null,
  updatedAt: null,
  isAuth: false,
};

const initialEmptyState = JSON.parse(JSON.stringify(initialState));

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const login = (login, password) => async (dispatch) => {
  const userResponse = await authAPI.login(login, password);
  if (userResponse.status === 200) {
    const user = userResponse.data.data.user;
    user.isAuth = true;
    dispatch(setAuthUserData(user));
  }
};

export const logout = () => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.status === 204) {
    dispatch(setAuthUserData({ ...initialEmptyState, isAuth: false }));
  }
};

export default userReducer;
