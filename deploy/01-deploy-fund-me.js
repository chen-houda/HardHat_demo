// function deployFunction() {
//  console.log('this is a deploy function');
// }
// module.exports.default = deployFunction;

const { network } = require("hardhat")
const { devlopmentChains , networkConfig, LOCK_TIME, CONFIRMATIONS } = require('../helper-hardhat-config')

// module.exports = async (hre) => {
//     const { deployments, getNamedAccounts } = hre
//      const ccounts  = await getNamedAccounts()
//     console.log(ccounts)
//     console.log('this is a deploy function')
// }

module.exports = async ({ deployments, getNamedAccounts }) => {
    const { firstAccount } = await getNamedAccounts()
    const { deploy } = deployments
    let dataFeedAddress
    let confirmations
    if (devlopmentChains .includes(network.name)) {
        const mockV3Aggregator = await deployments.get("MockV3Aggregator")
        dataFeedAddress = mockV3Aggregator.address
        confirmations = 0

    } else {
        dataFeedAddress = networkConfig[network.config.chainId].ethUsdDataFeed
        confirmations = CONFIRMATIONS
    }
    const fundMe = await deploy('FundMe', {
        from: firstAccount,
        args: [LOCK_TIME, dataFeedAddress],
        log: true,
        waitConfirmations: confirmations
    })
    // remove deployments directory or add --reset flag if you redeploy contract
    if (hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {

        await hre.run("verify:verify", {
            address: fundMe.address,
            constructorArguments: [LOCK_TIME, dataFeedAddress],
        });
    } else {
        console.log("verification skipped..")
    }
}

module.exports.tags = ['all', 'fundMe']