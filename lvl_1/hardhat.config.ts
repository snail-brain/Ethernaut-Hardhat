import "@nomiclabs/hardhat-waffle";
import * as dotenv from "dotenv";

dotenv.config();
const alchemy_key = process.env.ALCHEMY_KEY;



export default {
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemy_key}`
      }
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemy_key}`,
      from: '0x182Af69fB08b4D08c42B68cc0d9f50b14bCbFd7a',
      chainId: 4,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: "0.6.0",
};
