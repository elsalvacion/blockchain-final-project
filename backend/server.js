const express = require("express");
const ethers = require("ethers");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const abi = fs.readFileSync("./Authentication_sol_Authentication.abi", "utf8");
// const bytecode = fs.readFileSync(
//   "./DeviceAuthentication_sol_DeviceAuthentication.bin",
//   "utf8"
// );
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
const wallet = new ethers.Wallet(
  "0x94085363054c900261b0a38e2ab8328c6f39cf223c9a13657798c730918d311f",
  provider
);
const contractAddress = "0x836d28CC7a400FAA7809DE3C8a9c1eD91ec4B3ae";
const contract = new ethers.Contract(contractAddress, abi, wallet);
const bubbles = {
  1: [1, 2, 3],
  2: [4, 5, 6],
  3: [7, 8, 9],
};
app.post("/register", async (req, res) => {
  const deviceId = req.body.deviceId;
  const password = req.body.password;
  const bubbleId = req.body.bubbleId;
  const tx = await contract.register(deviceId, password, bubbleId);
  await tx.wait();
  res.send("Device registered successfully");
});

app.post("/login", async (req, res) => {
  const deviceId = req.body.deviceId;
  const password = req.body.password;
  const bubbleId = req.body.bubbleId;
  const deviceIds = bubbles[bubbleId];
  let isLoggedIn = false;
  for (let i = 0; i < deviceIds.length; i++) {
    const id = deviceIds[i];
    isLoggedIn = await contract.login(id, password, bubbleId);
    if (isLoggedIn) {
      break;
    }
  }
  res.send({ isLoggedIn });
});

app.post("/send-message", async (req, res) => {
  const { senderId, receiverId, bubbleId, message } = req.body;
  const tx = await contract
    .connect(signer)
    .sendMessage(senderId, receiverId, bubbleId, message);
  await tx.wait();
  res.send("Message sent successfully");
});

app.post("/get-message", async (req, res) => {
  const { senderId, receiverId, bubbleId } = req.body;
  const message = await contract.getMessage(senderId, receiverId, bubbleId);
  res.send({ message });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
