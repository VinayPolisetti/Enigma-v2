const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts','globalfiles.sol');
const source = fs.readFileSync(inboxPath,'utf8');
const compiled = solc.compile(source, 1);

module.exports = {
  interface: compiled.contracts[':GlobalFiles'].interface, // ABI - Application Binary Interface
  bytecode: compiled.contracts[':GlobalFiles'].bytecode,
};
