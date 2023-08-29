const IPFS = require('ipfs-api');
const projectId = '2NhQpdreMQSwSeogF55gegeJ43m';
const projectSecret = 'f820e54e161c566d3d254568ff769139';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const ipfs = new IPFS({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  }
});

export default ipfs;