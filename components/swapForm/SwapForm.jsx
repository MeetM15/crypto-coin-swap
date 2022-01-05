import { IoMdArrowDropdown } from "react-icons/io";
import { MdAccountBalanceWallet } from "react-icons/md";
import { BsCurrencyExchange } from "react-icons/bs";
import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import { Select , MenuItem , Menu } from "@mui/material"
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
  const [anchorNodeMenu, setAnchorNodeMenu] = useState(null);
  const [nodeValue, setNodeValue] = useState("Select Node");
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(anchorMenu != null);
  const [nodeMenuOpen, setNodeMenuOpen] = useState(anchorNodeMenu != null);

  const handleClick = (e) => {
    setAnchorMenu(e.currentTarget);
    setCurrencyMenuOpen(true);
  };
  const handleClose = () => {
    setAnchorMenu(null);
    setCurrencyMenuOpen(false);
  };
  const handleNodeClick = (e) => {
    setAnchorNodeMenu(e.currentTarget);
    setNodeMenuOpen(true);
  };
  const handleNodeMenuClose = (e) => {
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
    <div
      className="bg-secondary rounded-2xl w-full mx-1 sm:mx-0 sm:w-132 min-h-144 sm:min-h-128 flex flex-col items-center "
    >
      <div className="flex flex-col items-center justify-between p-6 border-b border-#E7E3EB w-full">
        <span className="font-bold text-xl w-full text-center">Snipe Bot</span>
        <span className="font-base text-sm text-subText w-full text-center">
          Trade tokens in an instant!
        </span>
      </div>
      <div className="flex flex-col items-center px-8 py-4 w-full">
        <form className="w-full flex flex-col items-center justify-evenly">
          <div className="w-full flex flex-col pt-2">
            <div className="w-full flex items-end justify-between">
              <div className="flex">
                <span
                  className="p-1 text-sm font-medium flex items-center"
                >
                  {selectedCurrency[1] && (
                    <img
                      src={selectedCurrency[1]}
                      alt="logo"
                      className="h-5 mr-2"
                    />
                  )}
                  {selectedCurrency[0] ? (selectedCurrency[0]=="ETH"?"Ethereum":"Binance") : ""}                 
                </span>
                <button
                  className="bg-transparent ml-2 text-xs text-inputText font-medium p-1 w-full flex rounded items-center justify-center"
                  onClick={handleClick}
                  type="button"
                >
                  {selectedCurrency[0] ? selectedCurrency[0] : ""}   
                  <IoMdArrowDropdown className="ml-1"/>              
                </button>
                <Menu
                  id="basic-currency-menu"
                  anchorEl={anchorMenu}
                  open={currencyMenuOpen}
                  onClose={handleClose}
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
              <input
                type="number"
                className="w-full bg-inputbg py-3 px-6 rounded-xl shadow-inner text-inputText font-medium"
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
              <button
                className="border-2 border-btnBlue text-xs font-medium px-3 py-1 flex rounded-xl items-center justify-center"
                onClick={() => {
                  setSwapAmount(userBalance);
                }}
                type="button"
              >
                Max
              </button>
              <span className="font-medium text-sm text-gray-500">
                {`1 ${selectedCurrency[0]} = $${
                  selectedCurrency[0] == "ETH" ? etherPrice : binancePrice
                }`}
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col pt-6">
            <div className="w-full flex items-center justify-start">
              <span
                  className="p-1 text-sm font-medium flex items-center"
                >
                  {convertToCurrency[3] && (
                    <img
                      src={convertToCurrency[3]}
                      alt="logo"
                      className="h-5 mr-2"
                    />
                  )}
                  {convertToCurrency[1] ? convertToCurrency[1] : ""}                 
              </span>
              <button
                className="bg-transparent ml-2 text-xs text-inputText font-medium p-1 flex rounded items-center justify-center"
                onClick={() => {
                  setShowSelectCurrency(true);
                }}
                type="button"
              >
                {convertToCurrency[0] ? convertToCurrency[0] : ""}
                
                <IoMdArrowDropdown className="ml-2" />
              </button>
            </div>
            <div className="w-full bg-inputbg py-3 px-6 rounded-xl shadow-inner text-inputText font-medium">
              {convertToAmount}
            </div>
            <div className="w-full flex items-end justify-end">
              <span className="font-medium text-sm text-gray-500">
                {`Price = $${Number(convertToCurrency[2]).toFixed(4)}`}
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col pt-6">
            <div className="w-full font-medium text-sm text-center">
              Max Slippage(Recommended 20)
            </div>
            <div className="w-full pt-2">
              <input
                type="number"
                className="w-full bg-inputbg py-3 px-6 rounded-xl shadow-inner text-inputText font-medium"
              />
            </div>
          </div>
          <div className="w-full flex flex-col pt-6">
            <div className="w-full font-medium text-sm text-center">
            Max Gas (Recommended 10000000)
            </div>
            <div className="w-full pt-2">
              <input
                type="number"
                className="w-full bg-inputbg py-3 px-6 rounded-xl shadow-inner text-inputText font-medium"
              />
            </div>
          </div>
          <div className="w-full flex flex-col pt-6">
            <div className="w-full font-medium text-sm text-center">
            Gwei (Recommended 49)
            </div>
            <div className="w-full pt-2">
              <input
                type="number"
                className="w-full bg-inputbg py-3 px-6 rounded-xl shadow-inner text-inputText font-medium"
              />
            </div>
          </div>
          <div className="w-full flex flex-col pt-6">
          <div className="w-full font-medium text-sm text-center">
            Node
            </div>
              <div className="w-full flex items-center justify-center pt-2">
                <button
                id="desktop"
                    className="hidden sm:flex bg-inputbg text-sm text-inputText font-medium p-2 w-full rounded items-center justify-center shadow-inner"
                    onClick={handleNodeClick}
                    type="button"
                  >
                  {`${nodeValue ? nodeValue.substring(0,48) : "Select Node"}...`}   
                  <IoMdArrowDropdown className="ml-1" size="20px"/>              
                </button>
                <button
                id="mobile"
                    className="sm:hidden bg-inputbg text-sm text-inputText font-medium py-3 px-6 w-full flex rounded-xl items-center justify-center shadow-inner"
                    onClick={handleNodeClick}
                    type="button"
                  >
                  {`${nodeValue ? nodeValue.substring(0,20) : "Select Node"}...`}   
                  <IoMdArrowDropdown className="ml-1" size="20px"/>              
                </button>
              <Menu
                anchorEl={anchorNodeMenu}
                open={nodeMenuOpen}
                onClose={handleNodeMenuClose}
                fullWidth         
              >
                  {
                    nodesList.map((node,index)=>{
                      return <MenuItem key={index} 
                      onClick={() => {
                        setNodeValue(node);
                        setNodeMenuOpen(false);
                      }} 
                      className="w-screen sm:w-112">
                        {node}
                        </MenuItem>
                    })
                  }                 
              </Menu>
              </div>    
          </div>
          <div className="w-full flex flex-col items-center justify-center pt-6">
            {web3.currentProvider &&
            (web3.currentProvider.accounts ||
              web3.currentProvider.selectedAddress) &&
            isWeb3Enabled &&
            walletConnected ? (
              <button
              className="bg-btnBlue text-xs text-white font-medium px-4 py-2 w-full flex rounded items-center justify-center"
                onClick={() => {
                  handleSwap();
                }}
                type="button" 
              >
                Swap
                <BsCurrencyExchange className="ml-2 text-white" size="32px" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowSelectWallet(true);
                }}
                className="bg-btnBlue text-xs text-white font-medium px-4 py-2 w-full flex rounded items-center justify-center"
                type="button" 
             >
                <MdAccountBalanceWallet
                  className="text-white mr-2"
                  size="32px"
                />
                Connect Wallet
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SwapForm;
