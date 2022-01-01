import { Paper, Button, InputLabel, OutlinedInput } from "@mui/material";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdAccountBalanceWallet } from "react-icons/md";
import { MdOutlineSwapVert } from "react-icons/md";
import { BsCurrencyExchange } from "react-icons/bs";
import { useMoralis } from "react-moralis";

const SwapForm = ({
  selectedCurrency,
  setShowSelectCurrency,
  convertToCurrency,
  setConvertToCurrency,
  swapAmount,
  setSwapAmount,
  convertToAmount,
  setConvertToAmount,
}) => {
  const { authenticate, user, isAuthenticated } = useMoralis();
  return (
    <Paper elevation={3} className="w-84 h-120 flex flex-col items-center ">
      <div className="flex flex-col items-center justify-between p-4 border-b-2 w-5/6">
        <span className="font-bold text-lg w-full text-center">Swap Token</span>
        <span className="font-medium text-base w-full text-center">
          Trade tokens in an instant!
        </span>
      </div>
      <div className="flex flex-col items-center py-2 w-5/6">
        <form className="w-full flex flex-col items-center justify-evenly">
          <div className="w-full flex flex-col pt-2">
            <div className="w-full flex items-end justify-between">
              <Button
                className="bg-btnRed font-bold flex items-center"
                onClick={() => {
                  setShowSelectCurrency("from");
                }}
                variant="contained"
                color="error"
              >
                {selectedCurrency[1] ? selectedCurrency[1] : ""}
                <img
                  src={selectedCurrency[3]}
                  alt="logo"
                  className="h-5 ml-2"
                />
                <IoMdArrowDropdown className="ml-2" size="24px" />
              </Button>
              <span className="font-medium text-sm text-gray-500">
                Balance : 0.0000
              </span>
            </div>
            <div className="w-full pt-2">
              <OutlinedInput
                type="number"
                fullWidth
                value={swapAmount}
                onChange={(e) => setSwapAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center pt-4">
            <Button
              className="bg-btnBlue font-bold flex items-center rounded-full w-min"
              onClick={() => {
                setShowSelectCurrency(true);
              }}
              variant="contained"
              color="info"
            >
              <MdOutlineSwapVert size="32px" />
            </Button>
          </div>
          <div className="w-full flex flex-col pt-4">
            <div className="w-full flex items-end justify-between">
              <Button
                className="bg-btnRed font-bold flex items-center"
                onClick={() => {
                  setShowSelectCurrency("to");
                }}
                variant="contained"
                color="error"
              >
                {convertToCurrency[1] ? convertToCurrency[1] : ""}
                <img
                  src={convertToCurrency[3]}
                  alt="logo"
                  className="h-5 ml-2"
                />
                <IoMdArrowDropdown className="ml-2" size="24px" />
              </Button>
              <span className="font-medium text-sm text-gray-500">
                Balance : 0.0000
              </span>
            </div>
            <div className="w-full mt-2 p-4 font-medium bg-gray-100 rounded">
              {convertToAmount}
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center pt-4">
            {isAuthenticated ? (
              <Button
                className="bg-btnBlue font-medium text-lg flex items-center rounded-full w-full"
                onClick={() => {
                  setShowSelectCurrency(true);
                }}
                variant="contained"
                color="secondary"
              >
                Swap
                <BsCurrencyExchange className="ml-2" size="32px" />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  authenticate({ provider: "metamask" });
                }}
                variant="contained"
                className="bg-btnBlue text-md font-bold w-full"
                color="info"
              >
                Connect Wallet
                <MdAccountBalanceWallet
                  className="text-white ml-2"
                  size="32px"
                />
              </Button>
            )}
          </div>
        </form>
      </div>
    </Paper>
  );
};

export default SwapForm;
