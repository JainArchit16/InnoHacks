const hre = require("hardhat");

async function main() {
  const RatingAndReviewSystem = await hre.ethers.getContractFactory(
    "RatingAndReviewSystem"
  );
  const ratingAndReviewSystem = await RatingAndReviewSystem.deploy();

  console.log(
    `RatingAndReviewSystem deployed to ${JSON.stringify(ratingAndReviewSystem)}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
