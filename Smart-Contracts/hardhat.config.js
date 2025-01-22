require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-contract-sizer");
const { vars } = require("hardhat/config");
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");

const { ALCHEMY_API_KEY} = process.env;
// const ETHERSCAN_API_KEY = Q7VBM949HQAIXZZ51TR3QSABBU1JUWY91V
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.25",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
    contractSizer: {
      alphaSort: true,
      disambiguatePaths: false,
    },
  },
  networks: {
    holesky: {
      url: `https://eth-holesky.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY]
    }
  },

  etherscan: {
    apiKey: {
      holesky: ETHERSCAN_API_KEY,
    },
  },
};