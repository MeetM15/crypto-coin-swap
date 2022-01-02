import { useMoralis } from "react-moralis";
import { Modal, Button } from "@mui/material";
import { MdContentCopy } from "react-icons/md";
import { VscDebugDisconnect, VscClose } from "react-icons/vsc";

const Wallet = ({ showWalletModal, setShowWalletModal }) => {
  const { logout, user } = useMoralis();
  return (
    <Modal
      open={showWalletModal}
      onClose={() => setShowWalletModal(false)}
      className="flex items-center justify-center"
    >
      {user ? (
        <div className="md:w-128 w-80 h-120 bg-white rounded p-4 flex flex-col items-center">
          <div className="p-4 w-full font-bold font-large flex items-center justify-between text-black border-b-2">
            <span className="font-bold text-lg">Your Wallet</span>
            <Button
              className="bg-btnRed font-bold flex items-center rounded-full w-min"
              onClick={() => {
                setShowWalletModal(false);
              }}
              variant="contained"
              color="info"
            >
              <VscClose size="24px" />
            </Button>
          </div>
          <div className="flex flex-col items-center mt-16 h-full w-full px-4 pb-4">
            <span className="flex flex-col items-center justify-center font-medium text-md mb-8 bg-gray-200 w-full rounded px-1 py-4">
              Wallet address :
              <span className="text-center font-medium text-md p-2 w-full rounded break-all md:break-none flex items-center justify-center">
                {user.get("ethAddress")}
                <MdContentCopy
                  onClick={() => {
                    navigator.clipboard.writeText(user.get("ethAddress"));
                  }}
                  className="cursor-pointer ml-2 h-8 w-12"
                  color="rgb(55 ,48 ,163)"
                />
              </span>
            </span>
            <Button
              className="bg-btnRed font-bold h-14 w-full"
              onClick={() => {
                setShowWalletModal(false);
                logout();
              }}
              variant="contained"
              color="error"
            >
              Disconnect Wallet
              <VscDebugDisconnect className="ml-2" size="24px" />
            </Button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </Modal>
  );
};

export default Wallet;
