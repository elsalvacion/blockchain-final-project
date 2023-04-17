import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutDevice } from "../actions/authAction";
import { sendMessage } from "../actions/messageAction";
import CustomModal from "../components/layout/CustomModal";
import { SEND_MESSAGE_RESET } from "../reducers/types/messageTypes";

const CommunicationScreen = ({ socket }) => {
  const { loading, error, deviceInfo } = useSelector(
    (state) => state.deviceLogin
  );
  const {
    loading: sending,
    error: sendingError,
    success,
  } = useSelector((state) => state.sendMessage);
  const [sendMsgValues, setSendMsgValues] = useState({
    receiverId: "",
    bubbleId: "",
    message: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!deviceInfo) {
      history.push("/");
    } else {
      // socket.emit("")
    }
  }, [deviceInfo]);

  useEffect(() => {
    setSendMsgValues({
      receiverId: "",
      bubbleId: "",
      message: "",
    });
  }, [success]);

  const handleSendMsg = (e) => {
    e.preventDefault();
    dispatch(sendMessage(sendMsgValues));
  };

  return (
    <div className="bg-white p-3 h-screen flex flex-col">
      {success && (
        <CustomModal
          text={"Message sent successfully"}
          title={"Message sent"}
          isOpen={success}
          closeModal={() => dispatch({ type: SEND_MESSAGE_RESET })}
        />
      )}
      <div className="flex items-center justify-end mb-6">
        <button onClick={() => dispatch(logoutDevice())} className="uppercase">
          Logout Device
        </button>
      </div>
      <div className="flex-1 flex flex-col lg:flex-row lg:items-stretch w-full">
        <div className="flex-1 lg:border-r lg:border-green-500 p-3 lg:p-5">
          <div className="flex items-stretch h-full">
            <div className="w-4/12 border border-black">
              <ul>
                <li className="p-2 cursor-pointer text-sm border-b border-gray-400">
                  Device ID: 1
                </li>
                <li className="p-2 cursor-pointer text-sm border-b border-gray-400">
                  Device ID: 2
                </li>
                <li className="p-2 cursor-pointer text-sm border-b border-gray-400">
                  Device ID: 1
                </li>
                <li className="p-2 cursor-pointer text-sm border-b border-gray-400">
                  Device ID: 1
                </li>
                <li className="p-2 cursor-pointer text-sm border-b border-gray-400">
                  Device ID: 1
                </li>
              </ul>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 bg-gray-800 p-2">
                <div className="p-2 bg-black text-white uppercase">
                  Device ID: 1
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="text-white p-2 rounded-sm bg-orange-800 w-fit px-7 text-left my-3">
                    <p className="text-sm">Hi</p>
                  </div>
                  <div className=" my-3 flex justify-end">
                    <div className="text-white p-2 rounded-sm bg-red-800 w-fit px-7 text-right flex justify-end">
                      <p className="text-sm">Hello</p>
                    </div>
                  </div>
                </div>
              </div>
              <form className="flex items-stretch">
                <input
                  required
                  type="text"
                  className="flex-1 border-black border outline-none p-2"
                  placeholder="Enter message here..."
                />
                <button className="bg-gray-200 p-2 px-4 border-none outline-none">
                  SEND
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 p-3 lg:p-5">
          <h2 className="text-center uppercase font-bold mb-7 text-2xl">
            Send Message
          </h2>
          <form onSubmit={handleSendMsg}>
            <div className="my-7">
              <label className="mb-2 block">Receiver Device ID</label>
              <input
                required
                type="text"
                className="border-black border outline-none p-2 rounded-sm block w-full"
                placeholder="Enter device ID"
                value={sendMsgValues.receiverId}
                onChange={(e) =>
                  setSendMsgValues({
                    ...sendMsgValues,
                    receiverId: e.target.value.trim().replace(/[^\d.-]+/g, ""),
                  })
                }
              />
            </div>

            <div className="my-7">
              <label className="mb-2 block">Device Bubble ID</label>
              <input
                required
                type="text"
                className="border-black border outline-none p-2 rounded-sm block w-full"
                placeholder="Enter device bubble ID"
                value={sendMsgValues.bubbleId}
                onChange={(e) =>
                  setSendMsgValues({
                    ...sendMsgValues,
                    bubbleId: e.target.value.trim().replace(/[^\d.-]+/g, ""),
                  })
                }
              />
            </div>
            <div className="my-7">
              <label className="mb-2 block">Message</label>
              <textarea
                required
                className="border-black border outline-none p-2 rounded-sm block w-full h-40"
                placeholder="Enter message here"
                value={sendMsgValues.message}
                onChange={(e) =>
                  setSendMsgValues({
                    ...sendMsgValues,
                    message: e.target.value,
                  })
                }
              ></textarea>
            </div>
            {sendingError && <p className="text-red-500">{sendingError}</p>}
            <button
              disabled={sending}
              className="bg-black p-2 text-white uppercase text-center px-10 hover:bg-black/80"
              type="submit"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunicationScreen;
