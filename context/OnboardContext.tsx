import { OnboardAPI } from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";

const injected = injectedModule();

const web3Onboard = init({
  wallets: [injected],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: "https://mainnet.infura.io/v3/064beaa039ca4d0da18afb89892c7020",
    },
    {
      id: "0x4",
      token: "rETH",
      label: "Ethereum Rinkeby Testnet",
      rpcUrl: "https://rinkeby.infura.io/v3/064beaa039ca4d0da18afb89892c7020",
    },
    {
      id: "0x38",
      token: "BNB",
      label: "BNB Chain",
      rpcUrl: "https://bsc-dataseed.binance.org/",
    },
    {
      id: "0x61",
      token: "BNB",
      label: "BNB Testnet",
      rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    },
    {
      id: "0x89",
      token: "MATIC",
      label: "Matic Mainnet",
      rpcUrl: "https://matic-mainnet.chainstacklabs.com",
    },
    {
      id: "0xfa",
      token: "FTM",
      label: "Fantom Mainnet",
      rpcUrl: "https://rpc.ftm.tools/",
    },
  ],
  appMetadata: {
    name: "P4 NFT",
    icon: "/logo.svg",
    description: "P4 NFT",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
    ],
  },
});

interface AppContextProps {
  onboard: OnboardAPI;
}
const OnboardContext = createContext<AppContextProps>({} as AppContextProps);

export const OnboardContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [onboard, setOnboard] = useState<OnboardAPI>({} as OnboardAPI);
  const [connectedWallet, setConnectedWallet] = useLocalStorage(
    "connectedWallet",
    ""
  );

  useEffect(() => {
    setOnboard(web3Onboard);
    console.log("connected", connectedWallet);
    if (connectedWallet) {
      web3Onboard.connectWallet({
        autoSelect: { label: connectedWallet, disableModals: true },
      });
    }
    const walletsSub = web3Onboard.state.select("wallets");
    walletsSub.subscribe((wallets) => {
      const connectedWallet = wallets.length > 0 ? wallets[0].label : "";
      setConnectedWallet(connectedWallet);
    });
  }, []);

  return (
    <OnboardContext.Provider value={{ onboard }}>
      {children}
    </OnboardContext.Provider>
  );
};

export const useOnboardContext = () => {
  return useContext(OnboardContext);
};

export const useOnboard = () => {
  const { onboard } = useOnboardContext();
  return onboard;
};
