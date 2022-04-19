import { ChainID } from "../types";

export const API_URL: string =
  process.env.NEXT_API_URL || "http://localhost:8000";

export const DEFAULT_CHAIN_ID: ChainID =
  (process.env.NEXT_CHAIN_ID as ChainID) || ChainID.BscTestnet;

export const CHAIN_INFO = {
  [ChainID.BscTestnet]: {
    rpc: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  },
};
