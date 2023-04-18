import {
  LOGIN_DEVICE_ERROR,
  LOGIN_DEVICE_LOADING,
  LOGIN_DEVICE_SUCCESS,
  LOGOUT_DEVICE,
} from "../reducers/types/authTypes";
import { backendBaseUrl } from "../constants/generalConstants";
import axios from "axios";
export const loginDevice = (details) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_DEVICE_LOADING,
    });
    const { data } = await axios.post(`${backendBaseUrl}/login`, details);
    localStorage.setItem("deviceInfo", JSON.stringify(details));
    dispatch({
      type: LOGIN_DEVICE_SUCCESS,
      payload: details,
    });
  } catch (err) {
    console.log(err);
    const message = err.response.data.msg || err.response.data || err.response;
    dispatch({
      type: LOGIN_DEVICE_ERROR,
      payload: message,
    });
  }
};

export const registerDevice = (details) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_DEVICE_LOADING,
    });
    const { data } = await axios.post(`${backendBaseUrl}/register`, details);
    localStorage.setItem("deviceInfo", JSON.stringify(details));
    dispatch({
      type: LOGIN_DEVICE_SUCCESS,
      payload: details,
    });
  } catch (err) {
    console.log(err);
    const message = err.response.data.msg || err.response.data || err.response;
    dispatch({
      type: LOGIN_DEVICE_ERROR,
      payload: message,
    });
  }
};

export const logoutDevice = () => async (dispatch) => {
  localStorage.removeItem("deviceInfo");
  dispatch({
    type: LOGOUT_DEVICE,
  });
};
