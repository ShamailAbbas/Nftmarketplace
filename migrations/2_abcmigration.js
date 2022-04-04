const NFTMarket = artifacts.require("NFTMarket");
const NFT = artifacts.require("NFT");
const fs = require('fs');
module.exports = function (deployer) {
  deployer.deploy(NFTMarket)
  .then(async()=>{
    let marketaddress=await NFTMarket.address
    await deployer.deploy(NFT,marketaddress)
    console.log("address of market is      ",marketaddress)

    let nftaddress=await NFT.address
    console.log("address of Nft contract is      ",nftaddress)
    
    let config = `
    export const nftmarketaddress = "${marketaddress}"
    export const nftaddress = "${nftaddress}"
    `  
    let data = JSON.stringify(config)
    fs.writeFileSync('./config.js', JSON.parse(data))
    fs.writeFileSync('./frontend/src/config.js', JSON.parse(data))  
  }); 
};
