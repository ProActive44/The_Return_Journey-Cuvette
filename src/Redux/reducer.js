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
      return {
        ...state,
        AllUsers: [...state.AllUsers, payload],
        currUser: payload,
      };

    case CURRUSERSCORE:
      let newAllUsers = state.AllUsers.map((ele) => {
        if (ele.email === payload.email) {
          if (payload.score > ele.score) {
            return payload;
          }
        }
        return ele;
      });
      return {
        ...state,
        currUser: payload,
        AllUsers: newAllUsers,
      };

    default:
      return state;
  }
};

export { Reducer };
