import { ChainID } from "../types";

export const DefaultChainId: ChainID =
  (process.env.NEXT_CHAIN_ID as ChainID) || ChainID.BscTestnet;

export const ChainInfo = {
  [ChainID.BscTestnet]: {
    rpc: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  },
};
