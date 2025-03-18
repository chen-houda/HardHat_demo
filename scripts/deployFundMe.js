// import ethers.js
// create main function
// execute main function

const { ethers } = require("hardhat")
async function main() {
    const fundMeFactory = await ethers.getContractFactory("FundMe")
    console.log("contract deploying")
    // deploy contract from factory
    const fundMe = await fundMeFactory.deploy(300)
    await fundMe.waitForDeployment()
    console.log(`contract has been deployed successfully, contract address is ${fundMe.target}`);
    // //为了在部署合约后等待一段时间再进行验证，可以在部署脚本中添加一个延迟
    // // 等待 60 秒
    // console.log("Waiting for 60 seconds before verifying the contract...");
    // await new Promise(resolve => setTimeout(resolve, 60000));

    // hre运行时环境 区分本地测试和链上部署
    // hre.network.config.chainId 区分链
    if (hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
        // // 等待5个确认
        console.log("Waiting for 5 confirmations")
        await fundMe.deploymentTransaction().wait(5)
        console.log("5 confirmations received")
        // // 验证合约
        //console.log("Verifying the contract...");
        // await hre.run("verify:verify", {
        //     address: fundMe.target,
        //     constructorArguments: [300],
        // });
        //console.log("Contract verified!");
        await verifyFundMe(fundMe.target, [300])
    } else {
        console.log("verification skipped..")
    }

    // init 2 accounts
    const [firstAccount, secondAccount] = await ethers.getSigners()

    // fund contract with first account
    //const fundTx = await fundMe.connect(firstAccount).fund({ value: ethers.parseEther("0.5") })
    //默认情况下，我们使用第一个帐户来签署交易，但是我们可以使用 connect 方法来指定我们想要使用的帐户
    const fundTx = await fundMe.fund({ value: ethers.parseEther("0.5") })
    await fundTx.wait()
    console.log(`2 accounts are ${firstAccount.address} and ${secondAccount.address}`)

    
    // check balance of contract
    const balanceOfContract = await ethers.provider.getBalance(fundMe.target)
    console.log(`Balance of the contract is ${balanceOfContract}`)

     // fund contract with second account
     const fundTxWithSecondAccount = await fundMe.connect(secondAccount).fund({value: ethers.parseEther("0.5")})
     await fundTxWithSecondAccount.wait()

     // check balance of contract
    const balanceOfContractAfterSecondFund = await ethers.provider.getBalance(fundMe.target)
    console.log(`Balance of the contract is ${balanceOfContractAfterSecondFund}`)

      // check mapping 
      const firstAccountbalanceInFundMe = await fundMe.fundersToAmount(firstAccount.address)
      const secondAccountbalanceInFundMe = await fundMe.fundersToAmount(secondAccount.address)
      console.log(`Balance of first account ${firstAccount.address} is ${firstAccountbalanceInFundMe}`)
      console.log(`Balance of second account ${secondAccount.address} is ${secondAccountbalanceInFundMe}`)
      

}

async function verifyFundMe(fundMeAddr, args) {
    console.log("Verifying the contract...");
    await hre.run("verify:verify", {
        address: fundMeAddr,
        constructorArguments: args,
    });
    console.log("Contract verified!");
}

main().then().catch((error) => {
    console.error(error)
    process.exit(0)
})