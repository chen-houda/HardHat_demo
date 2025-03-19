const { task } = require("hardhat/config")

task("interact-fundme", "interact with fundme contract")
    .addParam("addr", "fundme contract address")
    .setAction(async (taskArgs, hre) => {
        const fundMeFactory = await ethers.getContractFactory("FundMe")
        const fundMe = fundMeFactory.attach(taskArgs.addr)
        // try {
        //     const balance = await fundMe.fundersToAmount("0x5FbDB2315678afecb367f032d93F642f64180aa3");
        //     console.log(`Balance: ${balance}`);
        // } catch (error) {
        //     console.error("Error fetching balance. Ensure fundersToAmount exists and the address is valid:", error);
        // }
        // init 2 accounts
        const [firstAccount, secondAccount] = await ethers.getSigners()
        console.log(`Contract deployed at: ${fundMe.target}`);
        console.log(`Balance of first account ${firstAccount.address} `)
        console.log(`Balance of second account ${secondAccount.address}`)

        // fund contract with first account
        const fundTx = await fundMe.fund({ value: ethers.parseEther("0.5") })
        await fundTx.wait()

        // check balance of contract
        const balanceOfContract = await ethers.provider.getBalance(fundMe.target)
        console.log(`Balance of the contract is ${balanceOfContract}`)

        // fund contract with second account
        const fundTxWithSecondAccount = await fundMe.connect(secondAccount).fund({ value: ethers.parseEther("0.5") })
        await fundTxWithSecondAccount.wait()

        // check balance of contract
        const balanceOfContractAfterSecondFund = await ethers.provider.getBalance(fundMe.target)
        console.log(`Balance of the contract is ${balanceOfContractAfterSecondFund}`)

        // check mapping 
        const firstAccountbalanceInFundMe = await fundMe.fundersToAmount(firstAccount.address)
        const secondAccountbalanceInFundMe = await fundMe.fundersToAmount(secondAccount.address)
        console.log(`Balance of first account ${firstAccount.address} is ${firstAccountbalanceInFundMe}`)
        console.log(`Balance of second account ${secondAccount.address} is ${secondAccountbalanceInFundMe}`)
    })

module.exports = {}