import axios from "axios";
import {
  GET_MESSAGES_ERROR,
  GET_MESSAGES_LOADING,
  GET_MESSAGES_SUCCESS,
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
      senderBubbleId: parseInt(deviceInfo.bubbleId),
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

export const getMessages = (details) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_MESSAGES_LOADING,
    });
    const {
      deviceLogin: { deviceInfo },
    } = getState();

    const { data } = await axios.post(`${backendBaseUrl}/get-messages`, {
      deviceId: deviceInfo.deviceId,
    });

    dispatch({
      type: GET_MESSAGES_SUCCESS,
      payload: data.msg,
    });
  } catch (err) {
    console.log(err);
    const message = err.response.data.msg || err.response.data || err.response;
    dispatch({
      type: GET_MESSAGES_ERROR,
      payload: message,
    });
  }
};
