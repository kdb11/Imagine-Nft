const hre = require("hardhat");

async function main() {
  const NAME = "ImagineNFT"
  const SYMBOL = "IMGNFT"
  const COST = ethers.utils.parseUnits("1", "ether")

  const NFT = await hre.ethers.getContractFactory("NFT")
  const nft = await NFT.deploy(NAME, SYMBOL, COST)
  await nft.deployed()

  console.log(`Deployed NFT Contract at: ${nft.address}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});