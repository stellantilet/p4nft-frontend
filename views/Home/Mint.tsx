import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { ContractReceipt, ContractTransaction, ethers } from "ethers";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";
import { ChainInfo, DefaultChainId } from "../../config/constants";
import CONTRACTS from "../../config/contracts";

const Mint = ({}) => {
  const [submitting, setSubmitting] = useState(false);
  const [{ wallet, connecting }, connectWallet] = useConnectWallet();
  const [{ chains, settingChain }, setChain] = useSetChain();
  const [price, setPrice] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);

  const disabled = !wallet;

  const handleMint = async () => {
    if (!wallet) {
      return;
    }
    await setChain({ chainId: DefaultChainId });
    if (!wallet?.provider) {
      return;
    }

    const provider = new ethers.providers.Web3Provider(wallet?.provider);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACTS.ERC721P4.addresses[DefaultChainId],
      CONTRACTS.ERC721P4.abi,
      signer
    );

    setSubmitting(true);

    try {
      let tx: ContractTransaction = await contract.mint({});
      let receipt: ContractReceipt = await tx.wait();
      const events = receipt.events?.filter((x) => {
        return x.event === "Transfer";
      });
      if (events && events.length > 0) {
        toast.success("Mint successfully.");
      }
      loadData();
    } catch (error: any) {
      switch (error.code) {
        case 4001:
          break;
        default:
          toast(error.message);
          break;
      }
    }
    setSubmitting(false);
  };

  const loadData = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        ChainInfo[DefaultChainId].rpc
      );
      const contract = new ethers.Contract(
        CONTRACTS.ERC721P4.addresses[DefaultChainId],
        CONTRACTS.ERC721P4.abi,
        provider
      );
      const totalSupply = await contract.totalSupply();
      const maxSupply = await contract.maxSupply();
      setTotalSupply(totalSupply.toNumber());
      setMaxSupply(maxSupply.toNumber());
    } catch (error: any) {}
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 text-center">
      <p className="text-xl mb-2">
        {maxSupply === 0 ? (
          "__ / __ "
        ) : (
          <>
            {totalSupply} / {maxSupply}
          </>
        )}
      </p>
      <button
        disabled={disabled || submitting}
        className="bg-gray-900 disabled:bg-gray-500 hover:bg-gray-700 transition-colors text-white px-5 py-2"
        onClick={() => {
          handleMint();
        }}
      >
        <span className="flex items-center">
          {submitting && <CgSpinner className="animate-spin" />} Mint
        </span>
      </button>
    </div>
  );
};

export default Mint;
