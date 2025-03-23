// function deployFunction() {
//  console.log('this is a deploy function');
// }
// module.exports.default = deployFunction;

const { network } = require("hardhat")


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
    if (network.name == "sepolia") {
        dataFeedAddress = "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    } else {
        const mockDataFeed = await deployments.get("MockV3Aggregator")
        dataFeedAddress = mockDataFeed.address
    }
    await deploy('FundMe', {
        from: firstAccount,
        args: [300, dataFeedAddress],
        log: true
    })
}
module.exports.tags = ['All', 'fundMe']