const Web3 = require('web3');
const { ethereumRpcUrl, contractAddress, contractAbi } = require('./config');

const web3 = new Web3(ethereumRpcUrl);

async function listenToEthereum() {
    const contract = new web3.eth.Contract(contractAbi, contractAddress);
    contract.events.TokensLocked({
        fromBlock: 'latest'
    }, function(error, event) {
        if (error) {
            console.error('Error in event listener:', error);
            return;
        }
        console.log('Detected locked tokens:', event.returnValues);
        // Further processing can be done here
    });
}

module.exports = listenToEthereum;

