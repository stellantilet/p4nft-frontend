import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { CHAIN_ID } from "../../config/constants";

const Header = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
  const handleConnectWallet = async () => {
    try {
      await connect({});
      await setChain({ chainId: CHAIN_ID });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-black">
      <nav className="flex items-center justify-between flex-wrap px-4 py-6 container mx-auto">
        <div className="flex items-center flex-shrink-0 text-white mr-10">
          <Image src={"/logo.svg"} alt="logo" width="48px" height="48px" />
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border text-white border-white hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link href="/">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                NFTs
              </a>
            </Link>
          </div>
          <div>
            <button
              className={classNames({
                "text-white bg-gray-800 hover:bg-gray-700 transition-colors px-4 py-2 rounded-full":
                  true,
                hidden: !!wallet,
              })}
              onClick={handleConnectWallet}
            >
              {connecting ? "Connecting" : "Connect"} Wallet
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
