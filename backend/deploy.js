const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

const abi = fs.readFileSync("./Authentication_sol_Authentication.abi", "utf8");

const bytecode = fs.readFileSync(
  "./Authentication_sol_Authentication.bin",
  "utf8"
);

const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const factory = new ethers.ContractFactory(abi, bytecode, wallet);

const main = async () => {
  const contract = await factory.deploy();
  const details = await contract.deploymentTransaction().getTransaction();
  console.log(details);
};

main();
