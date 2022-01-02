import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import Wallet from "../components/modals/Wallet";
import SelectCurrency from "../components/modals/SelectCurrency";
import SwapForm from "../components/swapForm/SwapForm";
import {
  useOneInchTokens,
  useOneInchQuote,
  useMoralis,
  useMoralisWeb3Api,
} from "react-moralis";
import SelectWallet from "../components/modals/SelectWallet";

const selectList = [
  {
    name: "eth",
    logoURI:
      "https://ethereum.org/static/6b935ac0e6194247347855dc3d328e83/13c43/eth-diamond-black.png",
    price: 3750,
  },
  {
    name: "bnb",
    logoURI:
      "https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png",
    price: 525,
  },
];

const tList = [
  {
    symbol: "WBNB",
    name: "Wrapped BNB",
    price: 176,
    logoURI:
      "https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png",
  },
  {
    symbol: "CHI",
    name: "Chi Gastoken by 1inch",
    price: 2,
    logoURI:
      "https://tokens.1inch.io/0x0000000000004946c0e9f43f4dee607b0ef1fa1c.png",
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    price: 3,
    logoURI:
      "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
  },
  {
    symbol: "CAKE",
    name: "PancakeSwap Token",
    price: 4,
    logoURI:
      "https://tokens.1inch.io/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82.png",
  },
  {
    symbol: "BUSD",
    name: "BUSD Token",
    price: 5,
    logoURI:
      "https://tokens.1inch.io/0x4fabb145d64652a948d72533023f6e7a623c7c53.png",
  },
  {
    symbol: "ETH",
    name: "Ethereum Token",
    price: 6,
    logoURI:
      "https://tokens.1inch.io/0x2170ed0880ac9a755fd29b2688956bd959f933f8.png",
  },
  {
    symbol: "BTCB",
    name: "BTCB Token",
    price: 7,
    logoURI:
      "https://tokens.1inch.io/0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c.png",
  },
  {
    symbol: "AUTO",
    name: "AUTOv2",
    price: 8,
    logoURI:
      "https://tokens.1inch.io/0xa184088a740c695e156f91f5cc086a06bb78b827.png",
  },
  {
    symbol: "BSCX",
    name: "BSCX",
    price: 9,
    logoURI:
      "https://tokens.1inch.io/0x5ac52ee5b2a633895292ff6d8a89bb9190451587.png",
  },
  {
    symbol: "BDO",
    name: "bDollar",
    price: 10,
    logoURI:
      "https://tokens.1inch.io/0x190b589cf9fb8ddeabbfeae36a813ffb2a702454.png",
  },
];

export default function Home() {
  const web3 = useMoralisWeb3Api();
  const { getSupportedTokens } = useOneInchTokens();
  const [tokenList, setTokenList] = useState(tList);
  const [selectTokenList, setSelectTokenList] = useState(selectList);
  const [selectedCurrency, setSelectedCurrency] = useState(""); //0:name 1:logo 2:price
  const [selectedCurrencyPrice, setSelectedCurrencyPrice] = useState(0.0);
  const [convertToCurrency, setConvertToCurrency] = useState(""); //0:symbol , 1:name , 2:price , 3:logo
  const [swapAmount, setSwapAmount] = useState(0.0);
  const [convertToAmount, setConvertToAmount] = useState(0.0);
  const [showSelectCurrency, setShowSelectCurrency] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showSelectWallet, setShowSelectWallet] = useState(false);

  const handleSwap = () => {
    console.log({
      from: selectedCurrency[0],
      to: convertToCurrency[0],
      amount: swapAmount,
    });
  };

  useEffect(() => {
    if (swapAmount != 0)
      setConvertToAmount(
        ((swapAmount * selectedCurrency[2]) / convertToCurrency[2]).toFixed(6)
      );
    else setConvertToAmount(0.0);
  }, [swapAmount]);

  useEffect(() => {
    if (selectedCurrency != "") {
    }
  }, [selectedCurrency]);
  useEffect(() => {
    if (tokenList) {
      setConvertToCurrency([
        tokenList[0].symbol,
        tokenList[0].name,
        tokenList[0].price,
        tokenList[0].logoURI,
      ]);
    }
  }, [tokenList]);
  useEffect(() => {
    if (selectTokenList) {
      setSelectedCurrency([
        selectTokenList[0].name,
        selectTokenList[0].logoURI,
        selectTokenList[0].price,
      ]);
    }
  }, [selectTokenList]);

  //future----!!!!!!!!!!
  // useEffect(() => {
  //   const getBal = async () => {
  //     if (isAuthenticated && selectedCurrency != "") {
  //       const bal = await web3Api.account.getTokenBalances({
  //         price: "",
  //       });
  //       console.log("balances : ", bal);
  //     }
  //   };
  //   getBal();
  // }, [selectedCurrency]);

  // useEffect(() => {
  //   console.log("selected currency : ", selectedCurrency);
  // }, [selectedCurrency]);

  return (
    <Layout
      setShowWalletModal={setShowWalletModal}
      setShowSelectWallet={setShowSelectWallet}
    >
      <Head>
        <title>Crypto Exchange</title>
      </Head>
      <div className="w-full p-2 flex items-center justify-center">
        <SwapForm
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          selectTokenList={selectTokenList}
          setShowSelectCurrency={setShowSelectCurrency}
          convertToCurrency={convertToCurrency}
          swapAmount={swapAmount}
          setSwapAmount={setSwapAmount}
          convertToAmount={convertToAmount}
          setConvertToAmount={setConvertToAmount}
          handleSwap={handleSwap}
          setShowSelectWallet={setShowSelectWallet}
        />
      </div>
      <Wallet
        setShowWalletModal={setShowWalletModal}
        showWalletModal={showWalletModal}
      />
      <SelectCurrency
        showSelectCurrency={showSelectCurrency}
        setShowSelectCurrency={setShowSelectCurrency}
        tokenList={tokenList}
        setConvertToCurrency={setConvertToCurrency}
      />
      <SelectWallet
        showSelectWallet={showSelectWallet}
        setShowSelectWallet={setShowSelectWallet}
      />
    </Layout>
  );
}
