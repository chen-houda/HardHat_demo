module.exports = async ({ deployments, getNamedAccounts }) => {
    const { firstAccount } = await getNamedAccounts()
    const { deploy } = deployments
    await deploy('MockV3Aggregator', {
        from: firstAccount,
        args: [8,300000000000],
        log: true
    })
}
module.exports.tags = ['All','mock']