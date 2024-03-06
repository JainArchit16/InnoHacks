require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.24",
  },
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/VCPrALrdMqoLomOZI4_9GmfidYNJpQ9n",
      accounts: [
        `0x${"ef1b537c5099933743f6bb8d1b3a3e9341a3e2b3f5b51a3b98c7c1fbf4d88b0d"}`,
      ],
    },
  },
};
