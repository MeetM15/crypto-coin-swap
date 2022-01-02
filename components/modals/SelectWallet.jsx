import { useMoralis } from "react-moralis";
import { Modal, Button } from "@mui/material";
import { FaWolfPackBattalion, FaConnectdevelop } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";
const SelectWallet = ({ showSelectWallet, setShowSelectWallet }) => {
  const { logout, user, authenticate } = useMoralis();
  return (
    <Modal
      open={showSelectWallet}
      onClose={() => setShowSelectWallet(false)}
      className="flex items-center justify-center"
    >
      <div className="md:w-128 w-80 h-96 bg-white rounded p-4 flex flex-col items-center">
        <div className="p-4 font-bold font-large flex items-center justify-between text-black border-b-2 w-full">
          <span className="font-bold text-lg">Select Wallet</span>
          <Button
            className="bg-btnRed font-bold flex items-center rounded-full w-min"
            onClick={() => {
              setShowSelectWallet(false);
            }}
            variant="contained"
            color="info"
          >
            <VscClose size="24px" />
          </Button>
        </div>
        <div className="flex flex-col justify-center sm:flex-row sm:items-center sm:justify-between h-full w-full px-2 pb-4">
          <Button
            className="bg-btnBlue font-bold w-full h-24 mb-16 sm:mb-0 sm:w-1/2 sm:mr-4"
            onClick={() => {
              authenticate({ provider: "metamask" });
              setShowSelectWallet(false);
            }}
            variant="contained"
            color="error"
          >
            Metamask
            <FaWolfPackBattalion className="ml-2" size="24px" />
          </Button>
          <Button
            className="bg-btnBlue font-bold w-full h-24 sm:w-1/2 flex flex-col mb-2 sm:mb-0"
            onClick={() => {
              authenticate({ provider: "walletconnect" });
              setShowSelectWallet(false);
            }}
            variant="contained"
            color="error"
          >
            <span className="w-full font-bold flex items-center justify-center">
              WalletConnect
              <FaConnectdevelop className="ml-2" size="24px" />
            </span>
            <span className="w-full text-xs font-bold">
              (For mobile users only!)
            </span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SelectWallet;
