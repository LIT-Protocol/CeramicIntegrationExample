# What's going on here?

Welcome to the Lit Ceramic Integration web playground. This file will walk you through what's going on at a high level. The README is more technically constructive and deals with how to get things started, etc. There's also documentation in the docs file and in-line with the code.

### Intention of Project

This project uses the Lit-Ceramic Integration as a demonstration. It is intended to show a Lit-encrypted asset (in this case a string typed into the textfield) being stored encrypted on the ceramic network. There's plenty of documentation about ceramic at their site, ceramic.network, and we'll focus here mostly on how to use the Lit-Ceramic Integration. And how it's working.

### Talk me through it.

#### Encryption and Storage

You have a string that you've typed into the textfield and you're ready to store it such that it can be accessed by anyone that reads the streamID of the ceramic stream you create, but can only be decrypted (and hence read intelligibly by those that have the LIT NFT that you encode it with).

First the sting will need to be encrypted using the LIT-SDK. To do this one needs to log into metamask or equivalent and create a decentralized identity (prompted to do so automatically when you press Encrypt w/ Lit). Once that's complete you'll be asked to sign with you wallet to encrypt with the Lit protocol.

Second the Lit-Ceramic Integration will work in the background using the above to encrypt and send the data to the ceramic network, and set you up a stream. It should be noted that the data is first encrypted and then encoded into base 64 for easier storage on the ceramic network. Of note, even after decoding the data is still encrypted until one uses Lit and the right key to decrypt.

That's the end of the encryption flow.

#### Retrieval and Decryption

If you click the Read and then Decrypt w/ Lit button you'll be taken through the Retrieval process. Assuming you use the same wallet and use the same Decentralized Identity (often refered to as `did` for short) you can request that the web playground use the streamID of the data you just encrypted and stored and retreive it then decode and decrypt it.

So first it uses the streamID that was stored locally (and displayed on the website below the textfield) to ask the ceramic network to give it the data that we stored previously. It will come back as what ceramic calls a TileDocument, which is in the form of a JSON object that has two values, for the encrypted zip file blob and the symmetric key. Using our
