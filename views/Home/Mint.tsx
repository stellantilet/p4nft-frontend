import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import axios from "axios";
import { ContractReceipt, ContractTransaction, ethers } from "ethers";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";
import { API_URL, CHAIN_INFO, DEFAULT_CHAIN_ID } from "../../config/constants";
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
    await setChain({ chainId: DEFAULT_CHAIN_ID });
    if (!wallet?.provider) {
      return;
    }

    const provider = new ethers.providers.Web3Provider(wallet?.provider);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACTS.ERC721P4.addresses[DEFAULT_CHAIN_ID],
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
        const id = events[0].args?.tokenId.toString();
        toast.success(`NFT-${id} Mint successfully.`);
        const url = `${API_URL}/items`;
        axios.post(url, {
          id,
        });
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
        CHAIN_INFO[DEFAULT_CHAIN_ID].rpc
      );
      const contract = new ethers.Contract(
        CONTRACTS.ERC721P4.addresses[DEFAULT_CHAIN_ID],
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
