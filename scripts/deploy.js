

// scripts/deploy.js
const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const MyContract = await hre.ethers.getContractFactory("TokenAndEthLocker");
    //console.log(MyContract)
    const myContract = await MyContract.deploy();

    await myContract.deployed();

    console.log("Contract deployed at:", myContract.address);

    // Example of calling the 'speak' function
    const message = await myContract.speak();
    console.log("The contract says:", message);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});



