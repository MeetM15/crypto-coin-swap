import { useMoralis } from "react-moralis";
import { FaWolfPackBattalion, FaConnectdevelop } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";
import {Modal}from "@mui/material"

const SelectWallet = ({
  showSelectWallet,
  setShowSelectWallet,
  setWalletConnected,
}) => {
  const { enableWeb3, isWeb3Enabled, web3 } = useMoralis();
  return (
    <Modal
      open={showSelectWallet}
      onClose={() => setShowSelectWallet(false)}
      className="flex items-center justify-center"
    >
      <div className="md:w-128 w-80 h-min-96 bg-white rounded-2xl p-4 flex flex-col items-center">
      <div className="flex items-center justify-between p-4 border-b-4 w-full">
          <span className="font-bold text-2xl">Select Wallet</span>
          <button
            className="font-medium flex items-center w-min"
            onClick={() => {
              setShowSelectWallet(false);
            }}     
            type="button"       
          >
            <VscClose size="24px" />
          </button>
        </div>
       
        <div className="flex flex-col justify-center items-center sm:flex-row sm:items-start mt-8 h-full w-full px-2 pb-4">
          <div className="w-42 h-42 flex flex-col items-center  mb-16 sm:mb-0  sm:mr-4">
          <button
            className="bg-walletbg1 rounded-2xl font-bold h-36 w-36 sm:w-36 flex items-center justify-center"
            onClick={() => {
              if (isWeb3Enabled && web3.currentProvider.isMetaMask) {
                console.log(web3.currentProvider);
                setWalletConnected(true);
              } else {
                const res = enableWeb3({ provider: "metamask" });
                setWalletConnected(true);
              }
              setShowSelectWallet(false);
            }}
            type="button" 
          >        
            <img src="/metamask.svg" alt="metamask" className="h-12" />
          </button>
          <span className="font-medium text-lg">Metamask</span>
          </div>
          <div className="w-42 h-42 flex flex-col items-center  mb-16 sm:mb-0  sm:mr-4">
          <button
            className="bg-walletbg2 rounded-2xl font-bold h-36 w-36 sm:w-36 flex items-center justify-center"
            onClick={() => {
              if (isWeb3Enabled && !web3.currentProvider.isMetaMask) {
                setWalletConnected(true);
              } else {
                const res = enableWeb3({ provider: "walletconnect" });
                setWalletConnected(true);
              }
              setShowSelectWallet(false);
            }}
            type="button" 
          >
            <img src="/wconnect.svg" alt="wconnect" className="h-12" />
          </button>
          <span className="font-medium text-lg  text-center">
              WalletConnect(For mobile users only!)
          </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SelectWallet;
