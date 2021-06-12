import { SET_USER_DATA } from "./user.types";

export const setAuthUserData = ({
  id, login, email, isAuth,
  cured_at, cured, infected,
  vaccinated, followed_users,
  createdAt, updatedAt
}) => {
  return {
    type: SET_USER_DATA,
    payload: {
      id, login, email, isAuth, cured_at,
      cured, infected, vaccinated, followed_users,
      createdAt, updatedAt
    },
  };
};
