const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const valid = getNice("Paula Pagac DVM");
  const invalid = getNice("Paula P!!!c DVM");

  const { data: giftSuccess } = await axios.post(`${serverUrl}/gift`, valid);
  const { data: giftFailed } = await axios.post(`${serverUrl}/gift`, invalid);

  console.log({ giftSuccess, giftFailed });
}

function getNice(name) {
  const merkleTree = new MerkleTree(niceList);
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  return { name, proof };
}

main();