import axios from "axios";

export const loginCall = async (user, dispatch) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  dispatch({ type: "LOGIN_START" });
  try {
    const response = await axios.post(PUBLIC_FOLDER + "/api/auth/login", user);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", payload: error });
  }
};
