const { DECIIMAL, INITIAL_ANSWER,devlopmentChains  } = require('../helper-hardhat-config')
// deploy/00-deploy-mock.js
module.exports = async ({ deployments, getNamedAccounts }) => {
    if (devlopmentChains .includes(network.name)) {
        const { firstAccount } = await getNamedAccounts()
        const { deploy } = deployments
        await deploy('MockV3Aggregator', {
            from: firstAccount,
            args: [DECIIMAL, INITIAL_ANSWER],
            log: true
        })
    } else {
        console.log("environment is not local, mock contract depployment is skipped")
    }


}
module.exports.tags = ['all', 'mock']