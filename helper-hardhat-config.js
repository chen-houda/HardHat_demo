const DECIIMAL = 8
const INITIAL_ANSWER = 300000000000
const localChains = ["ganache", "hardhat"]
const networkConfig = {
    11155111: {
        ethUsdDataFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    }
}
const LOCK_TIME = 300

module.exports = {
    DECIIMAL,
    INITIAL_ANSWER,
    developmentChains,
    localChains,
    networkConfig,
    LOCK_TIME
}