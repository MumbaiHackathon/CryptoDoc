
var Preferences = require("preferences");

var prefs = new Preferences('cryptodoc');
if (typeof web3 !== 'undefined') {
web3 = new Web3(web3.currentProvider);
console.log("current provider selected");
}else{
    console.log("Install metamask");
}
web3.eth.defaultAccount = web3.eth.accounts[0];

// insert abi here

let CryptoContract = web3.eth.contract(prefs.abi);

let Crypto = CryptoContract.at(prefs.address);

console.log(Crypto)
