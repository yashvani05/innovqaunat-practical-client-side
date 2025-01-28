import axiosInstance from "../../lib/axiosInstance";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const ADD_TODO_FAILURE = "ADD_TODO_FAILURE";
export const UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS";
export const UPDATE_TODO_FAILURE = "UPDATE_TODO_FAILURE";
export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
export const FETCH_TODOS_FAILURE = "FETCH_TODOS_FAILURE";
export const DELETE_TODOS_SUCCESS = "DELETE_TODOS_SUCCESS";
export const DELETE_TODOS_FAILURE = "DELETE_TODOS_FAILURE";

export const addTodo =
  ({ key_name, key_value }) =>
  async (dispatch) => {
    try {
      const response = await axiosInstance.post("/encryption/encrypt-data", {
        key_name,
        key_value,
      });
      dispatch({ type: ADD_TODO_SUCCESS, payload: response.data.data });
    } catch (error) {
      dispatch({ type: ADD_TODO_FAILURE, payload: error.message });
    }
  };
export const decryptTodo =
  ({ key_name, key_value }) =>
  async (dispatch) => {
    try {
      const response = await axiosInstance.get(
        "/encryption/get-decrypted-data",
        {
          key_name,
          key_value,
        }
      );
      return response.data;
    } catch (error) {
      dispatch({ type: ADD_TODO_FAILURE, payload: error.message });
    }
  };
export const updateTodo = (key_value) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/encryption/encrypt-data", {
      key_value,
    });
    dispatch({ type: UPDATE_TODO_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_TODO_FAILURE, payload: error.message });
  }
};

export const fetchTodos = (page) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(
      `/encryption/get-encrypt-data?page=${page}&limit=100`
    );
    dispatch({ type: FETCH_TODOS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_TODOS_FAILURE, payload: error.message });
  }
};
export const deleteTodo =
  ({ id }) =>
  async (dispatch) => {
    try {
      const response = await axiosInstance.delete(
        `/encryption/delete-encrypt-data/${id}`
      );
      dispatch({ type: DELETE_TODOS_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: DELETE_TODOS_FAILURE, payload: error.message });
    }
  };
