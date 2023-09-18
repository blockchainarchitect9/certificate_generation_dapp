import Web3 from "web3";
import Cert from "./Cert.json" assert { type: "json" };
import deployer from "./deployer.json" assert { type: "json" };
import HDWalletProvider from "@truffle/hdwallet-provider";
//const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");

const provider = new HDWalletProvider({
  privateKeys: [
    "3038e6efb1a52463c6146b0e733ab67a37cbc7f0c06202df31b745993b573547",
  ],
  providerOrUrl:
    "https://eth-sepolia.g.alchemy.com/v2/NmBJ1hJ3l1xqGX14-zv7M6ShMfsuXMMk",
});

export const web3Connection = new Web3(provider);

export const contractInstance = new web3Connection.eth.Contract(
  Cert.abi,
  Cert.networks["11155111"].address
);

export const account = deployer.from;
