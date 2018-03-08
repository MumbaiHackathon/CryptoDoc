/* 
 * Obligatory function 
 *
 * function() {
 *
 * }
 *
 */


var bip39 = require('bip39');
var hdkey = require('ethereumjs-wallet/hdkey');
var utils = require('ethereumjs-util');

var seed = bip39.mnemonicToSeed('onion over warrior aware lava crisp hope purpose easy sense purse morning');

var first_acc_path = "m/44'/60'/0'/0/0";

var instance = hdkey.fromMasterSeed(seed);


var firstAccount = instance.derivePath(first_acc_path);

var privateKey = firstAccount.getWallet().getPrivateKey();
var publicKey = utils.privateToPublic(new Buffer(privateKey)).toString('hex');

console.log('Private: ' + privateKey.toString('hex'))
console.log('Public: ' + publicKey)
console.log('Address: ' + address.toString('hex'))
