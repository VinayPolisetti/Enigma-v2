
## Title

Decentralized Web-Based File Storage & Sharing System on Ethereum

## Abstract

Blockchain technology has been widely explored as a decentralized solution for recording transactions, but it has limitations when it comes to storing large files or documents. A decentralized storage system called InterPlanetary File System  (IPFS) has been developed to overcome this challenge. Although there have been attempts to combine IPFS and blockchain, sharing data through this approach has proven to be inefficient. To address this issue, a secure file-sharing system is proposed that utilizes a Decentralized Application (dAapp) for distributed access control and group key management. The dApp takes charge of control policies, while the combination of the IPFS server and blockchain network enables a secure file-sharing system where members can create or join groups based on their preferences. Although the IPFS server and blockchain network lack an access control mechanism, the secure file-sharing system manages access control policies so that members can access only the files they are authorized to.

## Objectives

The objectives include showing the advantages and trouble-free nature of using decentralized cloud and Blockchain over centralized file-sharing applications, suggesting a model for file-sharing with enhanced privacy including a planet-wide efficient zero-redundancy cloud, and building a prototype website that demonstrates the proposal by sharing a few files live globally and peer-to-peer followed by downloading respectively.
The dApp allows users to upload and share files of any size through a fully decentralized system, which is powered by IPFS. IPFS is a peer-to-peer file-sharing protocol that allows for the distribution of files across a network of nodes without needing a centralized server. IPFS allows the Dapp faster file access, reduced bandwidth consumption, improved scalability and Automatic Login via Metamask compared to traditional centralized file-sharing systems. Moreover, the files shared through IPFS are encrypted via Advanced Encryption Standard (AES) to provide total control over who can access them. This ensures that files are only accessible by authorized users and that the privacy of the users is protected.

![Logo](https://github.com/VinayPolisetti/Enigma-v2/blob/main/assets/Picture2.png?raw=true)

## Proposed Solution

When a new user wants to sign up to the website, they will have to enter a username (and a full name field). It is assumed that the user has a MetaMask account and is and is already logged into it and is accessing the website through the same browser window that has MetaMask installed providing the user with a metamask address as shown in Fig.2. A user’s public and private key is generated using RSA. The public and private keys along with the username are sent to the node that has a contract named main deployed on it. The main contract will now take all three inputs (username, user public key, and user private key) and create a new user on the Ethereum blockchain. The block is then deployed using a transaction facilitated by the MetaMask wallet. In our solution, upon initiating a transaction, a signed transaction reaches an Infura endpoint which then redirects it to an address on the blockchain where the block is to be deployed.

![Logo](https://github.com/VinayPolisetti/Enigma-v2/blob/main/assets/Picture1.png?raw=true)

After a user is logged in, in this case, we call the user a client, the client is given the freedom to create a group, to which it can add other clients as many as it wants/required. The non-owner clients get a notification/request in their dashboard regarding the group joins invitation. They can either accept or reject the group join request. In the same dashboard, the users can search for all the registered users on the website using usernames which on a successful fetch returns the user’s MetaMask address and a list of common groups.
When creating a group, the user enters a group name. A group public-private key pair is created and sent to the user account instance already deployed on the blockchain. The instance hosts a function to create a group instance. The group instance is then created and deployed after a transaction through the MetaMask wallet. The group instance consists of a custom self-implemented data structure called FolderTree. Each node in the tree can have either a file or a folder as a child node. Every node is indexed as an SHA-3 Hash that takes the immediate parent address, owner MetaMask address, & Block No. as input so that the nodes are harder to compromise in case of an attack more precisely represented in Fig.3. 

![Logo](https://github.com/VinayPolisetti/Enigma-v2/blob/main/assets/Picture3.png?raw=true)

To add a file to the folder tree, we first convert the file to a file buffer (stream of bytes). The file before encryption is converted to a file buffer and is encoded. We then use AES to encrypt it since file sizes can be quite large and AES is a low-time complexity algorithm. The file is then uploaded on IPFS by calling an add function on the file. The file if successfully uploaded to IPFS, will return a hash that contains tabular information about what parts of the file are uploaded where on the IPFS. The AES key is encrypted using RSA. Now to the group instance where this file is shared, a write operation is initiated on the group instance block that adds the file directory relative to the Folder Tree, The IPFS hash, the filename, and the RSA encrypted key. Since this operation involves updating the block, a transaction is needed to complete this operation. On the website, a table created to store information about files uploaded in the group is called to add a row corresponding to the newly updated file.

To download a file, from the group instance, the IPFS hash and the encrypted AES key (from the FolderTree), and the group private key are first sent to the client where the key is decrypted using the group private key. The IPFS hash is sent to the IPFS to retrieve a file buffer which will then be decrypted using the decrypted AES key, resulting in a decrypted file buffer. The file buffer can then be decoded before downloading the file in the comfort of your home. 

To share a file, we first decrypt the encrypted AES key, and get the file IPFS hash from the FolderTree, get the recipient user instance, get their public key, decrypt the AES key of the file buffer using the public key as shown in Fig.4. Two transactions occur here: One is for adding a row that a file was sent from the sender and the second is for adding a row that a file was received by the recipient. 

![Logo](https://github.com/VinayPolisetti/Enigma-v2/blob/main/assets/Picture4.png?raw=true)

The user can upload, share or download files to the IPFS directly through the website without relying on any third party. The website keeps track of all the file activities of the client in a tabular format. The files here are encrypted using the user public key which was generated during the sign-up.

While sharing a file in the groups, the file key is encrypted using the group public key as the group private key is common and available to all group members during decryption. In peer-to-peer mode, the file key is encrypted using the recipient’s public key.  

In the global space that we implemented, the user has the choice to upload the files either anonymously or by using their username. The files are sorted by their extensions. The files can be directly opened on the website through IPFS since they are not encrypted. A real-time chat option is also available to all users so that they can request a required file from all the other users using their MetaMask addresses in the global space. Users can use the chat option as a message forum or use it for file sharing. One Transaction each is required to send a chat message and to add a folder. 

When a file is deleted, the pointer variable corresponding to the file node marks the entire branch as invalid indicating not to search the branch for file retrieval in future requests, in order to account for a folder deletion. 
