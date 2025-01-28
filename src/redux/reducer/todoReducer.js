import {
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  DELETE_TODOS_FAILURE,
  DELETE_TODOS_SUCCESS,
} from "../action/todoActions";

const initialState = {
  data: [],
  hasMore: true,
  error: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        data: [action.payload, ...state.data],
        error: null,
      };
    case DELETE_TODOS_SUCCESS:
      return {
        ...state,
        data: state.data.filter((todo) => todo._id !== action.payload),
        error: null,
      };
    case ADD_TODO_FAILURE:
    case DELETE_TODOS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        hasMore: action.payload.hasMore,
        error: null,
      };
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
