const { ethers, deployments, getNamedAccounts, network } = require("hardhat")
const { assert } = require("chai");

describe("test fundme contract", async function () {
    let fundMe
    let fundMeSecondAccount
    let firstAccount
    let secondAccount
    let mockV3Aggregator
    beforeEach(async function () {
        await deployments.fixture(["all"])
        firstAccount = (await getNamedAccounts()).firstAccount
        secondAccount = (await getNamedAccounts()).secondAccount
        const fundMeDeployment = await deployments.get("FundMe")
        mockV3Aggregator = await deployments.get("MockV3Aggregator")
        fundMe = await ethers.getContractAt("FundMe", fundMeDeployment.address)
      
        //fundMeSecondAccount = await ethers.getContract("FundMe", secondAccount)
        fundMeSecondAccount = fundMe.connect(secondAccount)
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
        assert.equal((await fundMe.dataFeed()), mockV3Aggregator.address)
    })

    // fund, getFund, refund
    // unit test for fund
    // window open, value greater then minimum value, funder balance

});