import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import Wallet from "../components/modals/Wallet";
import SelectCurrency from "../components/modals/SelectCurrency";
import SwapForm from "../components/swapForm/SwapForm";
import { useMoralis } from "react-moralis";
import { useOneInchTokens } from "react-moralis";

export default function Home() {
  const { Moralis } = useMoralis();
  const { data } = useOneInchTokens({ chain: "bsc" });
  const [tokenList, setTokenList] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [convertToCurrency, setConvertToCurrency] = useState("");
  const [swapAmount, setSwapAmount] = useState(0.0);
  const [convertToAmount, setConvertToAmount] = useState(0.0);
  const [showSelectCurrency, setShowSelectCurrency] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  useEffect(() => {
    if (data != undefined && data.tokens != undefined) {
      const tokensArray = Object.values(data.tokens);
      setTokenList(tokensArray);
      setSelectedCurrency(() => {
        const res = tokensArray.filter((token) => token.symbol == "BNB");
        return [res[0].name, res[0].symbol, res[0].address, res[0].logoURI];
      });
      setConvertToCurrency(() => {
        const res = tokensArray.filter((token) => token.symbol == "USDT");
        return [res[0].name, res[0].symbol, res[0].address, res[0].logoURI];
      });
    }
  }, [data]);
  useEffect(() => {
    console.log("tokens list : ", tokenList);
  }, [tokenList]);
  useEffect(() => {
    console.log("selected currency : ", selectedCurrency);
  }, [selectedCurrency]);

  return (
    <Layout setShowWalletModal={setShowWalletModal}>
      <Head>
        <title>Crypto Exchange</title>
      </Head>
      <div className="w-full p-8 flex items-center justify-center">
        <SwapForm
          selectedCurrency={selectedCurrency}
          setShowSelectCurrency={setShowSelectCurrency}
          convertToCurrency={convertToCurrency}
          setConvertToCurrency={setConvertToCurrency}
          swapAmount={swapAmount}
          setSwapAmount={setSwapAmount}
          convertToAmount={convertToAmount}
          setConvertToAmount={setConvertToAmount}
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
        setTokenList={setTokenList}
        setSelectedCurrency={setSelectedCurrency}
        setConvertToCurrency={setConvertToCurrency}
      />
    </Layout>
  );
}
