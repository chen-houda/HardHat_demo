const { task } = require("hardhat/config")
task("deploy-fundme", "deploy and verify fundme contract").setAction(async (taskArgs, hre) => {
    // create factory 
    const fundMeFactory = await ethers.getContractFactory("FundMe")
    console.log("contract deploying")
    // deploy contract from factory
    // fundMeFactory.connect(secondAccount).deploy(300)
    const fundMe = await fundMeFactory.deploy(300)
    await fundMe.waitForDeployment()
    console.log(`contract has been deployed successfully, contract address is ${fundMe.target}`);

    // const balance = await fundMe.fundersToAmount("0x5FbDB2315678afecb367f032d93F642f64180aa3");
    // console.log(`Balance: ${balance}`);


    // verify fundme
    if (hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for 5 confirmations")
        await fundMe.deploymentTransaction().wait(5)
        await verifyFundMe(fundMe.target, [300])
    } else {
        console.log("verification skipped..")
    }
})

async function verifyFundMe(fundMeAddr, args) {
    await hre.run("verify:verify", {
        address: fundMeAddr,
        constructorArguments: args,
    });
}

module.exports = {}