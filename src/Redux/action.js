import { SAVENEWUSER, CURRUSERSCORE } from "./actionTypes";

export const newUser = (user) => (dispatch) => {
  let newUser = { ...user, score: user.score ? user.score : 0 };
  dispatch({ type: SAVENEWUSER, payload: newUser });
};

export const saveCurrUserScore = (user) => (dispatch) => {
  dispatch({ type: CURRUSERSCORE, payload: user });
};

export function initialLoad(dispatch) {
  let user = {
    email: "prasadmhaske2001@gmail.com",
    level: "easy",
    name: "Prasad Babasaheb Mhaske",
    number: "12345678790",
    score: 10,
  };
  dispatch(newUser(user));
}
