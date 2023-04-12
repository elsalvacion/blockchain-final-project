const express = require("express");
const ethers = require("ethers");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
const abi = fs.readFileSync("./Authentication_sol_Authentication.abi", "utf8");

const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, abi, wallet);

app.post("/register", async (req, res) => {
  const deviceId = parseInt(req.body.deviceId);
  const password = parseInt(req.body.password);
  const bubbleId = parseInt(req.body.bubbleId);

  try {
    const tx = await contract.register(deviceId, password, bubbleId);
    const receipt = await provider.waitForTransaction(tx.hash);
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

app.post("/send-message", async (req, res) => {
  try {
    const { senderId, receiverId, bubbleId, message } = req.body;
    const tx = await contract
      .sendMessage(senderId, receiverId, bubbleId, message)
      .connect(wallet);
    await tx.wait();
    res.send("Message sent successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: err.info.error.message
        ? err.info.error.message.split("revert ")[1]
        : "Blockchain Error",
    });
  }
});

app.post("/get-message", async (req, res) => {
  try {
    const { senderId, receiverId, bubbleId } = req.body;
    const message = await contract.getMessage(senderId, receiverId, bubbleId);
    res.send({ message });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: err.info.error.message
        ? err.info.error.message.split("revert ")[1]
        : "Blockchain Error",
    });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
