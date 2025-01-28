import axiosInstance from "../../lib/axiosInstance";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const LOGOUT = "LOGOUT";
export const VALIDATE_TOKEN_REQUEST = "VALIDATE_TOKEN_REQUEST";
export const VALIDATE_TOKEN_SUCCESS = "VALIDATE_TOKEN_SUCCESS";
export const VALIDATE_TOKEN_FAILURE = "VALIDATE_TOKEN_FAILURE";

export const login =
  ({ email, password }, navigate) =>
  async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      navigate("/about");
      return response;
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        error: error.response?.data?.message || "Login failed",
      });
      throw error;
    }
  };

export const signup = (userData, navigate) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const response = await axiosInstance.post("/user/sign-up", userData);
    dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
    navigate("/login");
    return response;
  } catch (error) {
    dispatch({
      type: SIGNUP_FAILURE,
      error: error.response?.data?.message || "Signup failed",
    });
    throw error;
  }
};

export const validateToken = () => async (dispatch) => {
  dispatch({ type: VALIDATE_TOKEN_REQUEST });
  try {
    const response = await axiosInstance.get("/user/validate-token");
    dispatch({ type: VALIDATE_TOKEN_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: VALIDATE_TOKEN_FAILURE, error: "Invalid token" });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axiosInstance.get("/user/logout");
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error("Error logging out", error);
  }
};
