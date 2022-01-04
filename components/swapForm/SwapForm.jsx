import { Menu, MenuItem, Paper, Button, OutlinedInput , Select ,InputLabel} from "@mui/material";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdAccountBalanceWallet } from "react-icons/md";
import { BsCurrencyExchange } from "react-icons/bs";
import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
const coingeckoUrl = () => {
  return `https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cbinancecoin&vs_currencies=usd`;
};
const nodesList=["enode://6329320c6e128b69f4ad78032e107ba9e3aa835ea07acc47a4370df0ca64c89c1488844ce389d6b06acc58c501799210c573b89470c5366daaa74dd1d2d33c18@138.197.162.205:30303","enode://1e17127e8cfb2f05f588f977a439626a1f174ffb9fe5ba8b7a93fed299b96a18fad579e669b2de7bc99b1d0a682b1252340d61e394a7d14b8f3284e0c087e526@20.89.154.217:30304","enode://89372650d92c468d1c9ecdd64ef4af6a9d96c983e6f36392ec6caf7467f668ba9e533d3ff7ac62371f1e79f2363ed44e3f58873af8104c23919393e37c882c1f@207.154.201.177:30303","enode://476746a703baae61a281205cbe20369a0e7d972b52653dd75fd8dec55382b411a1b8051f5360d6691d2954611793428f45972baa646fc30ca4d26c78f18ef234@93.75.22.22:30303","enode://e942d75fa6db1abcc6b973a34fd8727aa59214bea9cc5a9c2c393f9f5249ecc1ce4fafc42be44a8714c99f4f1322f80f200fef82fc3ec99105973c5016b30e34@165.22.252.218:30303"];

const SwapForm = ({
  selectedCurrency,
  setSelectedCurrency,
  setShowSelectCurrency,
  convertToCurrency,
  swapAmount,
  setSwapAmount,
  convertToAmount,
  selectTokenList,
  handleSwap,
  setShowSelectWallet,
  userBalance,
  etherPrice,
  setEtherPrice,
  binancePrice,
  setBinancePrice,
  walletConnected,
}) => {
  const { isWeb3Enabled, web3 } = useMoralis();
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [nodeValue, setNodeValue] = useState("Select Node");
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(anchorMenu != null);


  const handleClick = (e) => {
    setAnchorMenu(e.currentTarget);
    setCurrencyMenuOpen(true);
  };
  const handleClose = () => {
    setAnchorMenu(null);
    setCurrencyMenuOpen(false);
  };
  const handleNodeChange = (e) => {
    setNodeValue(e.target.value);
  };
  useEffect(() => {
    const fetchPrices = async () => {
      fetch(coingeckoUrl()).then((response) =>
        response.json().then((jsonData) => {
          console.log(jsonData);
          setEtherPrice(jsonData.ethereum.usd);
          setBinancePrice(jsonData.binancecoin.usd);
        })
      );
    };
    fetchPrices();
  }, []);
  return (
    <Paper
      elevation={3}
      className="w-full mx-1 sm:mx-0 sm:w-84 min-h-144 sm:min-h-128 flex flex-col items-center "
    >
      <div className="flex flex-col items-center justify-between p-4 border-b-2 w-5/6">
        <span className="font-bold text-lg w-full text-center">Swap Token</span>
        <span className="font-medium text-base w-full text-center">
          Trade tokens in an instant!
        </span>
      </div>
      <div className="flex flex-col items-center py-4 w-5/6">
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
                        selectTokenList[0].chain,
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
                        selectTokenList[1].chain,
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
                {`Balance : ${userBalance} ${selectedCurrency[0]}`}
              </span>
            </div>
            <div className="w-full pt-2">
              <OutlinedInput
                type="number"
                fullWidth
                value={swapAmount}
                onBlur={(e) => {
                  if (e.target.value <= 0) {
                    e.target.value = 0;
                  }
                  if (e.target.value >= userBalance) {
                    e.target.value = userBalance;
                  }
                  setSwapAmount(parseFloat(e.target.value));
                }}
                onChange={(e) => setSwapAmount(parseFloat(e.target.value))}
              />
            </div>
            <div className="w-full flex items-center justify-between h-8 mt-1">
              <Button
                className="text-xs mt-1 font-bold rounded-full border-2"
                variant="outlined"
                color="info"
                onClick={() => {
                  setSwapAmount(userBalance);
                }}
              >
                max
              </Button>
              <span className="font-medium text-sm text-gray-500">
                {`1 ${selectedCurrency[0]} = $${
                  selectedCurrency[0] == "ETH" ? etherPrice : binancePrice
                }`}
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col pt-6">
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
            </div>
            <div className="w-full mt-2 p-4 font-medium bg-gray-100 rounded">
              {convertToAmount}
            </div>
            <div className="w-full flex items-end justify-end">
              <span className="font-medium text-sm text-gray-500">
                {`Price : $${Number(convertToCurrency[2]).toFixed(4)}`}
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col pt-6">
            <div className="w-full font-medium text-base text-center">
              Max Slippage(Recommended 20)
            </div>
            <div className="w-full pt-2">
              <OutlinedInput
                type="number"
                fullWidth
              />
            </div>
          </div>
          <div className="w-full flex flex-col pt-6">
            <div className="w-full font-medium text-base text-center">
            Max Gas (Recommended 10000000)
            </div>
            <div className="w-full pt-2">
              <OutlinedInput
                type="number"
                fullWidth
              />
            </div>
          </div>
          <div className="w-full flex flex-col pt-6">
            <div className="w-full font-medium text-base text-center">
            Gwei (Recommended 49)
            </div>
            <div className="w-full pt-2">
              <OutlinedInput
                type="number"
                fullWidth
              />
            </div>
          </div>
          <div className="w-full flex flex-col pt-6">
          <div className="w-full font-medium text-base text-center">
            Node
            </div>
              <div className="w-full flex items-center justify-center pt-2">
              <Select
                value={nodeValue}
                onChange={handleNodeChange}
                className="w-full"             
              >
                  <MenuItem disabled value={"Select Node"}>Select Node</MenuItem>
                  {
                    nodesList.map((node,index)=>{
                      return <MenuItem key={index} value={node} className="w-72">{node}</MenuItem>;
                    })
                  }
                  
              </Select>
              </div>    
          </div>
          <div className="w-full flex flex-col items-center justify-center pt-6">
            {web3.currentProvider &&
            (web3.currentProvider.accounts ||
              web3.currentProvider.selectedAddress) &&
            isWeb3Enabled &&
            walletConnected ? (
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
                  setShowSelectWallet(true);
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
