const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'sing hold math march zebra express ahead spend scene satisfy law crucial',
  'https://sepolia.infura.io/v3/4d97bc4265f24a269a9e939ce9458f01'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '6000000', from: accounts[0] });
  console.log(interface);
  console.log('Contract deployed to ', result.options.address);
};
deploy();
