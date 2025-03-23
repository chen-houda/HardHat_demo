const { assert } = require("chai");

describe("test fundme contract", async function () {
    let fundMe
    let firstAccount
    let dataFeedAddress
    beforeEach(async function () {
        await deployments.fixture(["All"])
        firstAccount = (await getNamedAccounts()).firstAccount
        const fundMeDeployment = await deployments.get("FundMe")
        fundMe = await ethers.getContractAt("FundMe", fundMeDeployment.address)

          if (network.name == "sepolia") {
                dataFeedAddress = "0x694AA1769357215DE4FAC081bf1f309aDC325306"
            } else {
                const mockDataFeed = await deployments.get("MockV3Aggregator")
                dataFeedAddress = mockDataFeed.address
            }
    })

    it("test if the owner is msg.sender", async function () {
        // const [firstAccount] = await ethers.getSigners()
        // console.log(firstAccount.address)
        // const fundMeFactory = await ethers.getContractFactory("FundMe")
        // const fundMe = await fundMeFactory.deploy(300)
        await fundMe.waitForDeployment()
        //assert.equal((await fundMe.owner()), firstAccount.address)
        assert.equal((await fundMe.owner()), firstAccount)
    });

    it("test if the datafeed is assigned correctly", async function () {
        // const fundMeFactory = await ethers.getContractFactory("FundMe")
        // const fundMe = await fundMeFactory.deploy(300)
        await fundMe.waitForDeployment()
        assert.equal((await fundMe.dataFeed()), dataFeedAddress)
    })

});