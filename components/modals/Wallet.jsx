import { useMoralis } from "react-moralis";
import { MdContentCopy } from "react-icons/md";
import { VscDebugDisconnect, VscClose } from "react-icons/vsc";
import {Modal}from "@mui/material"

const Wallet = ({
  showWalletModal,
  setShowWalletModal,
  walletConnected,
  setWalletConnected,
}) => {
  const { isWeb3Enabled, web3 } = useMoralis();
  return (
    <Modal
    open={showWalletModal}
    onClose={() => setShowWalletModal(false)}
      className="flex items-center justify-center"
    >
      {web3.currentProvider &&
      (web3.currentProvider.accounts || web3.currentProvider.selectedAddress) &&
      isWeb3Enabled &&
      walletConnected ? (
        <div className="md:w-112 w-80 h-min-96 bg-white rounded p-4 flex flex-col items-center">
          <div className="flex items-center justify-between p-4 border-b-4 w-full">
          <span className="font-bold text-2xl">Select Wallet</span>
          <button
            className="font-medium flex items-center w-min"
            onClick={() => {
              setShowWalletModal(false);
            }}     
            type="button"       
          >
            <VscClose size="24px" />
          </button>
        </div>
          
          <div className="flex flex-col items-center mt-8 h-full w-full px-4 pb-4">
            <span className="flex flex-col items-center justify-center font-medium text-md mb-8 bg-gray-200 w-full rounded px-1 py-4">
              Wallet address :
              <span className="text-center font-medium text-md p-2 w-full rounded break-all md:break-none flex items-center justify-center">
                {web3.currentProvider.isMetaMask
                  ? web3.currentProvider.selectedAddress
                  : web3.currentProvider.accounts[0]}
                <MdContentCopy
                  onClick={() => {
                    navigator.clipboard.writeText(
                      web3.currentProvider.isMetaMask
                        ? web3.currentProvider.selectedAddress
                        : web3.currentProvider.accounts[0]
                    );
                  }}
                  className="cursor-pointer ml-2 h-8 w-12"
                  color="rgb(55 ,48 ,163)"
                />
              </span>
            </span>
            <button
              className="bg-btnBlue text-white text-sm font-medium px-4 py-3 w-64 flex rounded items-center justify-center"
              onClick={() => {
                setWalletConnected(false);
                setShowWalletModal(false);
              }}
              type="button" 
            >
              Disconnect Wallet
              <VscDebugDisconnect className="ml-2" size="24px" />
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </Modal>
  );
};

export default Wallet;
