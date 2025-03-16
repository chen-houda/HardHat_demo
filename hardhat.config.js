require("@nomicfoundation/hardhat-toolbox");
//require('dotenv').config()
require('@chainlink/env-enc').config()
const SEPOLIA_RPC_URL = process.env.SEPOLIA_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111//sepolia chain id
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    //apiKey: ETHERSCAN_API_KEY,//单值写法
    apiKey: {
      //mainnet: "YOUR_ETHERSCAN_API_KEY",//Multiple API keys and alternative block explorers
      sepolia: ETHERSCAN_API_KEY
    },
    timeout: 60000 // 增加超时时间到20秒
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  }
};
