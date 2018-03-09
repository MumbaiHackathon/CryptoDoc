const bip39     = require('bip39');
const hdkey     = require('ethereumjs-wallet/hdkey');
const EthCrypto = require('eth-crypto');
const sha256    = require('js-sha256');

const seed           = bip39.mnemonicToSeed('onion over warrior aware lava crisp hope purpose easy sense purse morning');
const first_acc_path = "m/44'/60'/0'/0/0";
const instance       = hdkey.fromMasterSeed(seed);
const firstAccount   = instance.derivePath(first_acc_path);

const privateKey = firstAccount.getWallet().getPrivateKeyString();
const publicKey  = EthCrypto.publicKeyByPrivateKey(privateKey);
const address    = EthCrypto.addressByPublicKey(publicKey);

/*
 *  This is the data we get after decryption from the blockchain which is then again encrypted if we need to send it to someone else using
 *  their private key.
 *
 */
let plainData = {
  name: 'Owais Khan',
  dob: '30-02-1999',
  aadhar: 'verified',
  pancard: 'verified'
}
plainData = JSON.stringify(plainData);


/*
 *
 *  This encryptedData is stored on the blockchain along with its hash.
 *  For example, for a Profile contract, the things being stored in the solidity contract should be
 *  -> string encryptedData
 *  -> string hashOfEncryptedData (using sha256)
 *  -> The plain data needs to be a string representation of a JSON Object of predefined format (i.e only
 *  encrypt, decrypt, store, send, anything - the string representation of JSON)
 *  *  The format should be predfined and strictly enforced (even the ordering to prevent mismatch of hash)
 *  -> In the case above, keys are name, dob, aadhar, pancard
 *
 *  NOTE: Care should be taken to avoid typos in the key name as well by certain python developers.
 *
 */
const encryptedData = {
  iv: 'd1bb0dc7e5d0276a33cd5947e5641279',
  ephemPublicKey:'042327160f18c9633b71c98ccf5009218cc2f16e30fc68e8966b804c28c7c6ce85a775e6805763170c1fad07a9af101386f8b8e5196d61888a00ac6285235552fe',
  ciphertext: 'f525d283b6cc44ba05a0f2274af8eb69b7452f883861cd50ff8ece9abba8dd85f3b3f4f15b851899106c0f55c9d75b47aeb9c0bb7c0db9cc32e3a41ef5f32aafed0e6b093db7195fff791dc35e87f33c6a9341390fc394c40b098f1e63804616',
  mac: 'f826f8fd2672d08ae251ef4989c8b15844ca5736c8e84ad9b9351162af3a4ac1'
}

/*
 *
 *  This hash is the hash of the plain data (String representation of the JSON Object) and is set only by the person authorized to create or modify the records on the
 *  blockchain (in our case the government)
 *
 */
const hashStoredOnTheBlockChain = '2ee7e99f148b03ae2a998da1ba2ef667de20e6fa8dc98d19552a586efcf3c503';

/*
 *
 *  Sign the plaintext using the sender's private key to authenticate that he is the legitimate owner of the data he is
 *  sending
 *
 */
const signature = EthCrypto.sign(privateKey, plainData);
console.log('Signature of the message: ', signature);

/*
 *
 *  Recover the address from the sender's signature and the decrypted plain data and match it against the one stored on
 *  the block chain. If it's the same, then the sender is the actual owner of the information he sent.
 *
 */
const addressRecovered = EthCrypto.recover(signature, plainData);
console.log('Address is the same as the address recovered: ', address == addressRecovered)


/*
 *
 *  Function to decrypt data
 *
 */
EthCrypto.decryptWithPrivateKey(privateKey, encryptedData)
  .then( (decryptedData) => {
    hashDecrypted = sha256(decryptedData);
    console.log('Hashesh Match with the Hash on the block chain: ', hashDecrypted == hashStoredOnTheBlockChain);
  });


/*
 *
 *  Funcrion to encrypt data
 *
 */
EthCrypto.encryptWithPublicKey(publicKey, plainData)
  .then( (encryptedData) => {
    console.log('Encrypted Data: ',encryptedData);
  });



