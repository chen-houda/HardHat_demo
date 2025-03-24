// function deployFunction() {
//  console.log('this is a deploy function');
// }
// module.exports.default = deployFunction;

const { network } = require("hardhat")
const { localChains, networkConfig, LOCK_TIME } = require('../helper-hardhat-config')

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
        dataFeedAddress = networkConfig[network.chainId].ethUsdDataFeed
    }
    await deploy('FundMe', {
        from: firstAccount,
        args: [LOCK_TIME, dataFeedAddress],
        log: true
    })
}
module.exports.tags = ['All', 'fundMe']