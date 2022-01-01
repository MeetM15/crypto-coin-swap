import { useMoralis } from "react-moralis";
import { Modal, Button } from "@mui/material";
import { MdContentCopy } from "react-icons/md";
import { VscDebugDisconnect } from "react-icons/vsc";
const Wallet = ({ showWalletModal, setShowWalletModal }) => {
  const { logout, user } = useMoralis();
  return (
    <Modal
      open={showWalletModal}
      onClose={() => setShowWalletModal(false)}
      className="flex items-center justify-center"
    >
      {user ? (
        <div className="md:w-128 w-64 h-96 bg-white rounded p-8 flex flex-col items-center justify-between">
          <div className="p-4 font-bold font-large flex items-center justify-center text-black border-b-2">
            Your Wallet
          </div>
          <div className="flex flex-col items-center mt-8 h-full w-full px-4 pb-4">
            <span className="flex flex-col items-center justify-center font-medium text-md mb-4 bg-gray-200 w-full rounded px-1 py-4">
              Wallet address :
              <span className="text-center font-medium text-md p-2 w-full rounded break-all md:break-none flex items-center justify-center">
                {user.get("ethAddress")}
                <MdContentCopy
                  onClick={() => {
                    navigator.clipboard.writeText(user.get("ethAddress"));
                  }}
                  className="cursor-pointer ml-2"
                  color="rgb(55 ,48 ,163)"
                  size="24px"
                />
              </span>
            </span>
            <Button
              className="bg-btnRed font-bold"
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
