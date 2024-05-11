import axios from "axios";

export const loginCall = async (user, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await axios.post(
      "https://real-sns-back-end.onrender.com/api/auth/login",
      user
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", payload: error });
  }
};
