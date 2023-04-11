const express = require("express");
const ethers = require("ethers");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
const abi = fs.readFileSync("./Authentication_sol_Authentication.abi", "utf8");
// const bytecode = fs.readFileSync(
//   "./DeviceAuthentication_sol_DeviceAuthentication.bin",
//   "utf8"
// );
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
const wallet = new ethers.Wallet(
  "0xb517bde62ad1821234e01f9ca76300074c58f4710b0e14c139b928f99eb6de2b",
  provider
);
const contractAddress = "0x9c5318Dfe5831a8375B0f2fa85595354c8D39d34";
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
    res.status(500).json({ error: err.info.error.data.reason });
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
    console.error(err);
    res.status(500).json({ error: err.info.error.data.reason });
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
    res.status(500).json({ error: err.info.error.data.reason });
  }
});

app.post("/get-message", async (req, res) => {
  try {
    const { senderId, receiverId, bubbleId } = req.body;
    const message = await contract.getMessage(senderId, receiverId, bubbleId);
    res.send({ message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.info.error.data.reason });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
