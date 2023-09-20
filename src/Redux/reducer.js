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
      return {
        ...state,
        currUser: payload,
        AllUsers: state.AllUsers.map((ele) =>
          ele.email === payload.email && payload.score > ele.score
            ? { ...ele, score: payload.score }
            : ele
        ),
      };

    default:
      return state;
  }
};

export { Reducer };
