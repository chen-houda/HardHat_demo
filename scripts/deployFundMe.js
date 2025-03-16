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