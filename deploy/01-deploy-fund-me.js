// function deployFunction() {
//  console.log('this is a deploy function');
// }
// module.exports.default = deployFunction;


// module.exports = async (hre) => {
//     const { deployments, getNamedAccounts } = hre
//      const ccounts  = await getNamedAccounts()
//     console.log(ccounts)
//     console.log('this is a deploy function')
// }

module.exports = async ({ deployments, getNamedAccounts }) => {
    const { firstAccount } = await getNamedAccounts()
    const { deploy } = deployments
    await deploy('FundMe', {
        from: firstAccount,
        args: [300],
        log: true
    })
}
module.exports.tags = ['All','fundMe']