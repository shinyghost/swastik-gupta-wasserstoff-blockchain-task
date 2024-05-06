const listenToEthereum = require('./ethereumListener');

async function main() {
    await listenToEthereum();
}

main().catch(error => {
    console.error('Relayer encountered an error:', error);
    process.exit(1);
});

