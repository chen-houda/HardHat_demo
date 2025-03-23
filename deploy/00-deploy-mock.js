const { DECIIMAL,INITIAL_ANSWER } = require('../helper-hardhat-config')
// deploy/00-deploy-mock.js
module.exports = async ({ deployments, getNamedAccounts }) => {
    const { firstAccount } = await getNamedAccounts()
    const { deploy } = deployments
    await deploy('MockV3Aggregator', {
        from: firstAccount,
        args: [DECIIMAL,INITIAL_ANSWER],
        log: true
    })
}
module.exports.tags = ['All','mock']