import { CURRUSERSCORE, SAVENEWUSER } from "./actionTypes";

const initState = {
  AllUsers: [],
  isLoading: false,
  isError: false,
  currUser: {},
};

const Reducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVENEWUSER:
      const emailExists = state.AllUsers.some(
        (ele) => ele.email === payload.email
      );
      if (emailExists) {
        return state;
      }
      return {
        ...state,
        AllUsers: [...state.AllUsers, payload],
        currUser: payload,
      };

    case CURRUSERSCORE:
      console.log("AllUsers", state.AllUsers);
      console.log("payload", payload);

      const updatedUsers = state.AllUsers.map((ele) =>
        ele.email === payload.email
          ? { ...ele, score: payload.score }
          : ele
      );
      console.log("updatedUsers", updatedUsers);
      return {
        ...state,
        currUser: payload,
        AllUsers: updatedUsers,
      };

    default:
      return state;
  }
};

export { Reducer };
