const ethers = require("ethers");
const fs = require("fs");

const abi = fs.readFileSync("./Authentication_sol_Authentication.abi", "utf8");

const bytecode = fs.readFileSync(
  "./Authentication_sol_Authentication.bin",
  "utf8"
);

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
const wallet = new ethers.Wallet(
  "0x94085363054c900261b0a38e2ab8328c6f39cf223c9a13657798c730918d311f",
  provider
);

const factory = new ethers.ContractFactory(abi, bytecode, wallet);

const main = async () => {
  const contract = await factory.deploy();
  const details = await contract.deploymentTransaction().getTransaction();
  console.log(details);
};

main();
