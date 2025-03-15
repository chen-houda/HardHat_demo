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

}
main().then().catch((error) => {
    console.error(error)
    process.exit(0)
})