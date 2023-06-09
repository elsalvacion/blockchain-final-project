const express = require("express");
const ethers = require("ethers");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io"); // Add this
const { send } = require("process");
const { sendSingleEmail } = require("./sendEmail");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
const abi = fs.readFileSync("./Authentication_sol_Authentication.abi", "utf8");

const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, abi, wallet);

function generateBubbleId() {
  return Math.floor(1 + Math.random() * (50 - 1 + 1));
}
app.post("/register", async (req, res) => {
  const deviceId = parseInt(req.body.deviceId);
  const password = parseInt(req.body.password);
  const bubbleId = generateBubbleId();
  try {
    const tx = await contract.register(deviceId, password, bubbleId);
    const receipt = await provider.waitForTransaction(tx.hash);
    sendSingleEmail({
      email: req.body.email,
      subject: "Registration Successful",
      message: `
      <p>Dear user,</p>
      <p>You device is successfully regsitered</p>
      <p>Your login details are as follows:</p>
      <br>
      <p>Device ID: <b>${deviceId}</b></p>
      <p>Bubble ID: <b>${bubbleId}</b></p>
      <p>Password ID: <b>${password}</b></p>
      `,
    });
    res.json({ msg: receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: err.info.error.message
        ? err.info.error.message.split("revert ")[1]
        : "Blockchain Error",
    });
  }
});

app.post("/login", async (req, res) => {
  const deviceId = parseInt(req.body.deviceId);
  const password = parseInt(req.body.password);
  const bubbleId = parseInt(req.body.bubbleId);

  try {
    const isLoggedIn = await contract.login(deviceId, password, bubbleId);
    if (!isLoggedIn) return res.status(400).json({ msg: isLoggedIn });

    res.json({ msg: isLoggedIn });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: err.info.error.message
        ? err.info.error.message.split("revert ")[1]
        : "Blockchain Error",
    });
  }
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `http://localhost:3000`,
    methods: ["GET", "POST"],
  },
});

// Add this
// Listen for when the client connects via socket.io-client
io.on("connection", (socket) => {
  // send message
  socket.on("send_message", async (data) => {
    try {
      const {
        senderId,
        receiverId,
        senderBubbleId,
        receiverBubbleId,
        message,
      } = data;
      const tx = await contract.sendMessage(
        senderId,
        receiverId,
        senderBubbleId,
        receiverBubbleId,
        message
      );
      await tx.wait();
      socket.emit("message_sent");
      io.emit(String(receiverId));
    } catch (err) {
      socket.emit("send_message_error", {
        error: err.info.error.message
          ? err.info.error.message.split("revert ")[1]
          : "Blockchain Error",
      });
    }
  });

  socket.on("get_messages", async (data) => {
    const { deviceId } = data;
    const messages = await contract.getMessagesSentTo(deviceId);
    // Convert BigInt values to strings
    const messagesStr = {};
    Object.entries(messages).forEach(([key, value]) => {
      messagesStr[key] = value.toString();
    });

    socket.emit("messages_loaded", messagesStr);
  });
});

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
