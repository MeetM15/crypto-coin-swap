import { Menu, MenuItem, Paper, Button, OutlinedInput } from "@mui/material";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdAccountBalanceWallet } from "react-icons/md";
import { MdOutlineSwapVert } from "react-icons/md";
import { BsCurrencyExchange } from "react-icons/bs";
import { useMoralis } from "react-moralis";
import { useState } from "react";
const SwapForm = ({
  selectedCurrency,
  setSelectedCurrency,
  setShowSelectCurrency,
  convertToCurrency,
  swapAmount,
  setSwapAmount,
  convertToAmount,
  setConvertToAmount,
  selectTokenList,
  handleSwap,
}) => {
  const { authenticate, user, isAuthenticated } = useMoralis();
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(anchorMenu != null);
  const handleClick = (event) => {
    setAnchorMenu(event.currentTarget);
    setCurrencyMenuOpen(true);
  };
  const handleClose = () => {
    setAnchorMenu(null);
    setCurrencyMenuOpen(false);
  };
  return (
    <Paper
      elevation={3}
      className="w-full mx-2 sm:mx-0 sm:w-84 h-120 flex flex-col items-center "
    >
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
              <div>
                <Button
                  id="select-button"
                  className="bg-btnRed font-bold flex items-center"
                  onClick={handleClick}
                  variant="contained"
                  color="error"
                >
                  {selectedCurrency[0] ? selectedCurrency[0] : ""}
                  {selectedCurrency[1] && (
                    <img
                      src={selectedCurrency[1]}
                      alt="logo"
                      className="h-5 ml-2"
                    />
                  )}
                  <IoMdArrowDropdown className="ml-2" size="24px" />
                </Button>
                <Menu
                  id="basic-currency-menu"
                  anchorEl={anchorMenu}
                  open={currencyMenuOpen}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "select-button",
                  }}
                  fullWidth
                >
                  <MenuItem
                    onClick={() => {
                      setSelectedCurrency([
                        selectTokenList[0].name,
                        selectTokenList[0].logoURI,
                      ]);
                      setCurrencyMenuOpen(false);
                    }}
                    className="w-24 flex items-center justify-between"
                  >
                    {selectTokenList[0].name ? selectTokenList[0].name : ""}
                    {selectTokenList[0].logoURI && (
                      <img
                        src={selectTokenList[0].logoURI}
                        alt="logo"
                        className="h-5 ml-2"
                      />
                    )}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSelectedCurrency([
                        selectTokenList[1].name,
                        selectTokenList[1].logoURI,
                      ]);
                      setCurrencyMenuOpen(false);
                    }}
                    className="w-24 flex items-center justify-between"
                  >
                    {selectTokenList[1].name ? selectTokenList[1].name : ""}
                    {selectTokenList[1].logoURI && (
                      <img
                        src={selectTokenList[1].logoURI}
                        alt="logo"
                        className="h-5 ml-2"
                      />
                    )}
                  </MenuItem>
                </Menu>
              </div>
              <span className="font-medium text-sm text-gray-500">
                Balance : 0.0000
              </span>
            </div>
            <div className="w-full pt-2">
              <OutlinedInput
                type="number"
                fullWidth
                value={swapAmount}
                onBlur={(e) => {
                  if (e.target.value > 1) {
                    e.target.value = 1.0;
                  }
                  if (e.target.value < -1) {
                    e.target.value = 0.0;
                  }
                  if (e.target.value < 0 && e.target.value >= -1) {
                    e.target.value = -Number(e.target.value).toFixed(6);
                  }
                  setSwapAmount(e.target.value);
                }}
                onChange={(e) => setSwapAmount(e.target.value)}
              />
            </div>
            <div className="w-full flex items-end justify-end">
              <span className="font-medium text-sm text-gray-500">
                {`Price : ${Number(selectedCurrency[2]).toFixed(4)} $`}
              </span>
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
                  setShowSelectCurrency(true);
                }}
                variant="contained"
                color="error"
              >
                {convertToCurrency[0] ? convertToCurrency[0] : ""}
                {convertToCurrency[3] && (
                  <img
                    src={convertToCurrency[3]}
                    alt="logo"
                    className="h-5 ml-2"
                  />
                )}
                <IoMdArrowDropdown className="ml-2" size="24px" />
              </Button>
              <span className="font-medium text-sm text-gray-500">
                Balance : 0.0000
              </span>
            </div>
            <div className="w-full mt-2 p-4 font-medium bg-gray-100 rounded">
              {convertToAmount}
            </div>
            <div className="w-full flex items-end justify-end">
              <span className="font-medium text-sm text-gray-500">
                {`Price : ${Number(convertToCurrency[2]).toFixed(4)} $`}
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center pt-4">
            {isAuthenticated ? (
              <Button
                className="bg-btnBlue font-medium text-lg flex items-center rounded-full w-full"
                onClick={() => {
                  handleSwap();
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
