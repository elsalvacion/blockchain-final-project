import {
  LOGIN_DEVICE_ERROR,
  LOGIN_DEVICE_LOADING,
  LOGIN_DEVICE_SUCCESS,
  LOGOUT_DEVICE,
} from "./types/authTypes";

export const deviceLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_DEVICE_LOADING:
      return {
        loading: true,
      };

    case LOGIN_DEVICE_SUCCESS:
      return {
        deviceInfo: action.payload,
      };
    case LOGIN_DEVICE_ERROR:
      return {
        error: action.payload,
      };
    case LOGOUT_DEVICE:
      return {};
    default:
      return state;
  }
};
