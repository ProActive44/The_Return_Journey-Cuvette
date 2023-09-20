import { SAVENEWUSER } from "./actionTypes";

export const newUser = (user) => (dispatch) => {
  dispatch({ type: SAVENEWUSER, payload: user });
};
