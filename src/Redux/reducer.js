import { SAVENEWUSER } from "./actionTypes";

const initState = {
  AllUsers: [],
  isLoading: false,
  isError: false,
};

const Reducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVENEWUSER:
      return { ...state, AllUsers: [...state.AllUsers, payload] };

    default:
      return state;
  }
};

export { Reducer };
