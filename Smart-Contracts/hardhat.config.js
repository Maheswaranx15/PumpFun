require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { vars } = require("hardhat/config");
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");

const { ALCHEMY_API_KEY} = process.env;
// const ETHERSCAN_API_KEY = Q7VBM949HQAIXZZ51TR3QSABBU1JUWY91V
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.25",

  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: ['a93f2b1407bca31ff6a5de58cf8c94f5ebbee8e16a446f9c5073c090335bcc0a']
    }
  },

  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
};