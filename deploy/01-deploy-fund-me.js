// function deployFunction() {
//  console.log('this is a deploy function');
// }
// module.exports.default = deployFunction;

const { network } = require("hardhat")
const { localChains, networkConfig, LOCK_TIME, CONFIRMATIONS } = require('../helper-hardhat-config')

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
    if (localChains.includes(network.name)) {
        const mockV3Aggregator = await deployments.get("MockV3Aggregator")
        dataFeedAddress = mockV3Aggregator.address

    } else {
        dataFeedAddress = networkConfig[network.config.chainId].ethUsdDataFeed
    }

    // remove deployments directory or add --reset flag if you redeploy contract
    if (hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
        const fundMe = await deploy('FundMe', {
            from: firstAccount,
            args: [LOCK_TIME, dataFeedAddress],
            log: true,
            waitConfirmations: CONFIRMATIONS
        })
        await hre.run("verify:verify", {
            address: fundMe.address,
            constructorArguments: [LOCK_TIME, dataFeedAddress],
        });
    } else {
        await deploy('FundMe', {
            from: firstAccount,
            args: [LOCK_TIME, dataFeedAddress],
            log: true
        })
        console.log("verification skipped..")
    }
}

module.exports.tags = ['all', 'fundMe']