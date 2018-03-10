if (typeof window.web3 !== 'undefined') {
   web3 = new Web3(web3.currentProvider);
    console.log("current provider selected");
} else {
    console.log("Install metamask");
}

web3.eth.defaultAccount = web3.eth.accounts[0];
// insert abi here
var abi = abi;
let CryptoContract = web3.eth.contract(abi);

let Crypto = CryptoContract.at(address);

console.log(Crypto)
