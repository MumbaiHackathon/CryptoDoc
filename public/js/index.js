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

let CryptoContract = web3.eth.contract(prefs.abi);

let Crypto = CryptoContract.at(prefs.address);

console.log(Crypto)