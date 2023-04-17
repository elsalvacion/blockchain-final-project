import {
  GET_MESSAGES_ERROR,
  GET_MESSAGES_LOADING,
  GET_MESSAGES_RESET,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGE_ERROR,
  GET_MESSAGE_LOADING,
  GET_MESSAGE_RESET,
  GET_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
  SEND_MESSAGE_LOADING,
  SEND_MESSAGE_RESET,
  SEND_MESSAGE_SUCCESS,
} from "./types/messageTypes";

export const sendMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_MESSAGE_LOADING:
      return { loading: true };
    case SEND_MESSAGE_SUCCESS:
      return { success: true };
    case SEND_MESSAGE_ERROR:
      return { error: action.payload };
    case SEND_MESSAGE_RESET:
      return {};
    default:
      return state;
  }
};

export const getMessagesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MESSAGES_LOADING:
      return { loading: true };
    case GET_MESSAGES_SUCCESS:
      return { messages: action.payload };
    case GET_MESSAGES_ERROR:
      return { error: action.payload };
    case GET_MESSAGES_RESET:
      return {};
    default:
      return state;
  }
};

export const getMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MESSAGE_LOADING:
      return { loading: true };
    case GET_MESSAGE_SUCCESS:
      return { messages: action.payload };
    case GET_MESSAGE_ERROR:
      return { error: action.payload };
    case GET_MESSAGE_RESET:
      return {};
    default:
      return state;
  }
};
