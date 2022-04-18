import abiP4CToken from "../abis/P4CToken.json";
import abiERC721P4 from "../abis/ERC721P4.json";
import { ChainID } from "../types";

const CONTRACTS = {
  ERC721P4: {
    addresses: {
      [ChainID.BscTestnet]: "0x08da54761430cceb632fa90774ce42d30673fa9c",
    },
    abi: abiERC721P4,
  },
  P4CToken: {
    addresses: {
      [ChainID.BscTestnet]: "0xfdD0F8Ff9DfFB0862800ccc0a8b9A480874271a9",
    },
    abi: abiP4CToken,
  },
};

export default CONTRACTS;
