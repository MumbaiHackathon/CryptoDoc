// write this in separate handle bars file and include it as partial use {{address}} for address and {{abi} for abi.
if (typeof window.web3 !== 'undefined') {
    const provider = new HDWalletProvider( //Mnemonic
        "onion over warrior aware lava crisp hope purpose easy sense purse morning", //Infura Rinkeby API Key
        "https://rinkeby.infura.io/ED9vOUpLhJwFOiFGcBRM");
    web3 = new Web3(provider);
    console.log("current provider selected");
} else {
    console.log("Install metamask");
}

let accounts = web3.eth.getAccounts();
console.log(accounts);

// insert abi here
let CryptoContract = web3.eth.contract('');

let Crypto = CryptoContract.at('');

console.log(Crypto)
