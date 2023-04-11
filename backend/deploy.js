const ethers = require("ethers");
const fs = require("fs");

const abi = fs.readFileSync("./Authentication_sol_Authentication.abi", "utf8");

const bytecode = fs.readFileSync(
  "./Authentication_sol_Authentication.bin",
  "utf8"
);

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
const wallet = new ethers.Wallet(
  "0xb517bde62ad1821234e01f9ca76300074c58f4710b0e14c139b928f99eb6de2b",
  provider
);

const factory = new ethers.ContractFactory(abi, bytecode, wallet);

const main = async () => {
  const contract = await factory.deploy();
  const details = await contract.deploymentTransaction().getTransaction();
  console.log(details);
};

main();
