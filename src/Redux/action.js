import { SAVENEWUSER, CURRUSERSCORE } from "./actionTypes";

export const newUser = (user) => (dispatch) => {
  dispatch({ type: SAVENEWUSER, payload: user });
};

export const saveCurrUserScore = (user) => (dispatch) => {
  dispatch({ type: CURRUSERSCORE, payload: user });
};

export function initialLoad(dispatch) {
  let user = {
    email: "prasadmhaske2001@gmail.com",
    level: "easy",
    name: "Prasad Babasaheb Mhaske",
    number: "78745218956",
    score: 10,
  };
  dispatch(newUser(user));
}
