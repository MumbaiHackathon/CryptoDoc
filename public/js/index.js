if (typeof window.web3 !== 'undefined') {
   web3 = new Web3(web3.currentProvider);
    console.log("current provider selected");
} else {
    console.log("Install metamask");
}

web3.eth.defaultAccount = web3.eth.accounts[0];
// insert abi here
var abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "documents",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_public_key_of_owner",
				"type": "string"
			},
			{
				"name": "_encrypted_data",
				"type": "string"
			},
			{
				"name": "_hash_of_plain_data",
				"type": "string"
			}
		],
		"name": "createDocument",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];

let CryptoContract = web3.eth.contract(abi);

let Crypto = CryptoContract.at(address);

console.log(Crypto)
