import axios from "axios";
import {
  SEND_MESSAGE_ERROR,
  SEND_MESSAGE_LOADING,
  SEND_MESSAGE_SUCCESS,
} from "../reducers/types/messageTypes";
import { backendBaseUrl } from "../constants/generalConstants";

export const sendMessage = (details) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEND_MESSAGE_LOADING,
    });
    const {
      deviceLogin: { deviceInfo },
    } = getState();
    const { data } = await axios.post(`${backendBaseUrl}/send-message`, {
      ...details,
      senderId: parseInt(deviceInfo.deviceId),
    });

    dispatch({
      type: SEND_MESSAGE_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    const message = err.response.data.msg || err.response.data || err.response;
    dispatch({
      type: SEND_MESSAGE_ERROR,
      payload: message,
    });
  }
};
