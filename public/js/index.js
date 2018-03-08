
if (typeof web3 !== 'undefined') {
web3 = new Web3(web3.currentProvider);
console.log("current provider selected");
}else{
    console.log("Install metamask");
}
web3.eth.defaultAccount = web3.eth.accounts[0];

// insert abi here
let Crypto = CryptoContract.at('0x0b96d4c37da82acbe2a7c2960cc098b9a310acb9');

console.log(Crypto)
