## CryptoDoc - Storing personal identification documents on blockchain.

## Abstract - 
Personal privacy and identification theft have been major threats to have plagued our government and society in general. To solve them, we will be putting your personal identifiers on the blockchain, encrypted using Elliptic Curve Cryptography such a way that only you can decrypt them. Sharing on relevant information would only be possible if you wish so. Unlike today, you won’t have to go through many processes to get your data verified. Data would never be tampered, hence preventing creation of fake documents, passports, etc.

## Proposed System -
 - Step 1: Government organization encrypts your documents using your public key.
 - Step 2: They then upload those encrypted documents on the blockchain which you can access and decrypt.
 - Step 3: You sign a transaction (with your address) of sending your document to the receiver.
 - Step 4: You send the unique address of the document along with data encrypted using the receiver’s public key.
 - Step 5: Receiver decrypts the data using his private key.
 - Step 6: From the user signature, a receiver can know the integrity of the data (that it was sent by a valid user).
 - Step 7: Receiver compares hash of the given data to the hash present on the blockchain for verification of authenticity.

## Show Stoppers -
 1. Tamper-proof private data
 2. Does not need to go through many middlemen to be verified
 3. Authentication without passwords or any centralized database
