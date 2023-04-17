import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { deviceLoginReducer } from "./reducers/authReducer";
import {
  getMessageReducer,
  getMessagesReducer,
  sendMessageReducer,
} from "./reducers/messageReducer";

const reducers = combineReducers({
  deviceLogin: deviceLoginReducer,
  sendMessage: sendMessageReducer,
  getMessages: getMessagesReducer,
  getMessage: getMessageReducer,
});

const middleware = [thunk];
const initialState = {
  deviceLogin: {
    deviceInfo: localStorage.getItem("deviceInfo")
      ? JSON.parse(localStorage.getItem("deviceInfo"))
      : null,
  },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
