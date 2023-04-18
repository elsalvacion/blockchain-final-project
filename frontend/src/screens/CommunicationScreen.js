import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutDevice } from "../actions/authAction";
import CustomModal from "../components/layout/CustomModal";
const CommunicationScreen = ({ socket }) => {
  const { deviceInfo } = useSelector((state) => state.deviceLogin);

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const [messages, setMessages] = useState({});
  const [sendMsgValues, setSendMsgValues] = useState({
    receiverId: "",
    receiverBubbleId: "",
    message: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!deviceInfo) {
      history.push("/");
    } else {
      socket.emit("get_messages", { deviceId: deviceInfo.deviceId });
    }
    // eslint-disable-next-line
  }, [deviceInfo]);

  useEffect(() => {
    setSendMsgValues({
      receiverId: "",
      receiverBubbleId: "",
      message: "",
    });
  }, [success]);

  useEffect(() => {
    socket.on("message_sent", () => {
      setSending(false);
      setSuccess(true);
    });
    socket.on(deviceInfo.deviceId, () => {
      socket.emit("get_messages", { deviceId: deviceInfo.deviceId });
    });

    socket.on("messages_loaded", (data) => {
      setMessages(data);
    });
    // eslint-disable-next-line
  }, []);

  const handleSendMsg = (e) => {
    e.preventDefault();
    setSending(true);
    socket.emit("send_message", {
      ...sendMsgValues,
      senderId: parseInt(deviceInfo.deviceId),
      senderBubbleId: parseInt(deviceInfo.bubbleId),
    });
  };

  return (
    <div className="bg-white p-3 h-screen flex flex-col">
      {success && (
        <CustomModal
          text={"Message sent successfully"}
          title={"Message sent"}
          isOpen={success}
          closeModal={() => setSuccess(false)}
        />
      )}
      <div className="flex items-center justify-between mb-6 border-b border-black">
        {deviceInfo && (
          <div className="flex items-center">
            <h1 className="mx-3 my-2">Device ID: {deviceInfo.deviceId}</h1>
            <h1 className="mx-3 my-2">Bubble ID: {deviceInfo.bubbleId}</h1>
          </div>
        )}
        <button onClick={() => dispatch(logoutDevice())} className="uppercase">
          Logout Device
        </button>
      </div>
      <div className="flex-1 flex flex-col lg:flex-row lg:items-stretch w-full">
        <div className="flex-1 lg:border-r lg:border-green-500 p-3 lg:p-5">
          <h2 className="text-center uppercase font-bold mr-3 text-2xl mb-7">
            Incoming Messages
          </h2>
          <table className="table-fixed border border-black">
            <thead>
              <tr className="border border-black">
                <th className="border border-black p-3">Sender ID</th>
                <th className="border border-black p-3">BubbleID</th>
                <th className="border border-black p-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {messages && Object.keys(messages).length > 0 ? (
                Object.keys(messages)
                  .reverse()
                  .map((key) =>
                    parseInt(messages[key].split(",")[0]) !== 0 ? (
                      <tr key={key} className="border border-black">
                        <td className="border border-black p-3">
                          {messages[key].split(",")[0]}
                        </td>
                        <td className="border border-black p-3">
                          {messages[key].split(",")[2]}
                        </td>
                        <td className="border border-black p-3">
                          {
                            messages[key].split(",")[
                              messages[key].split(",").length - 1
                            ]
                          }
                        </td>
                      </tr>
                    ) : null
                  )
              ) : (
                <tr>
                  <p>No incoming messages</p>
                </tr>
              )}
            </tbody>
          </table>
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
                value={sendMsgValues.receiverBubbleId}
                onChange={(e) =>
                  setSendMsgValues({
                    ...sendMsgValues,
                    receiverBubbleId: e.target.value
                      .trim()
                      .replace(/[^\d.-]+/g, ""),
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
                    // eslint-disable-next-line
                    message: e.target.value.replace(/[\,]+/, ""),
                  })
                }
              ></textarea>
            </div>
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
