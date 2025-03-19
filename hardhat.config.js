require("@nomicfoundation/hardhat-toolbox");
//require('dotenv').config()
require('@chainlink/env-enc').config()
// require("./tasks/deploy-fundme")
// require("./tasks/interact-fundme")
require("./tasks")
//这会触发 index.js 文件的执行，从而加载并注册所有任务文件中的任务
//index.js 的作用是作为任务文件的入口点，统一加载并导出所有任务文件中的任务定义。通过这种方式，你可以在 hardhat.config.js 中只需加载一次 index.js，就能注册所有任务，简化了任务的管理和使用
const SEPOLIA_RPC_URL = process.env.SEPOLIA_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const PRIVATE_KEY_1 = process.env.PRIVATE_KEY_1
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
/** @type import('hardhat/config').HardhatUserConfig */


//在 hardhat.config.js 文件中，不需要显式引入 require("hardhat/config") 是因为 Hardhat 自动将其配置文件视为一个特殊的模块。Hardhat 会自动加载并解析 hardhat.config.js，并将其作为配置文件的一部分处理。
// task("balance", "Prints an account's balance")
//   .addParam("account", "The account's address")
//   .setAction(async (taskArgs) => {
//     const balance = await ethers.provider.getBalance(taskArgs.account);

//     console.log(ethers.formatEther(balance), "ETH");
//   });
//显示所有账号任务
task("accounts", "Prints the list of accounts with balances").setAction(async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  if (accounts.length > 1) {
    const tx = await accounts[0].sendTransaction({
      to: accounts[1].address,
      value: hre.ethers.parseEther("10") // Sending 0.01 ETH
    });
    await tx.wait();
    console.log(`Sent 0.01 ETH from ${accounts[0].address} to ${accounts[1].address}`);
  }
  for (const account of accounts) {
    const balance = await hre.ethers.provider.getBalance(account.address);
    console.log(`${account.address} - ${hre.ethers.formatEther(balance)} ETH`);
  }
});
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY, PRIVATE_KEY_1],
      chainId: 11155111//sepolia chain id
    },
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: ["0x4f95fcd652665dd0a88800014668591af3bf2ecc1f28eda9fa62a0ebf2c2a13d", "0xcbe678a66edeb2a091e8cbf341aedf8a18e9dfbaea6ffc334b656fbcfaa5b201"]
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
