require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");
/** @type import('hardhat/config').HardhatUserConfig */

const endpointUrl = "https://eth-sepolia.g.alchemy.com/v2/tlkEETuk7cE2QAMdhkQqmvNwbhLD60N2";
const privateKey = "6da70f16fd66ff55a29bc327ba947e4b4e4a64fb3635a8581ead2e499fe2be6b";

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: endpointUrl,
      accounts: [privateKey],
      chainId: 11155111,
    },
  },

};