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
