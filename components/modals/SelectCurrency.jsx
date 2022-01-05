import { useEffect, useState } from "react";
import { VscClose } from "react-icons/vsc";
import {Modal}from "@mui/material"
const SelectCurrency = ({
  showSelectCurrency,
  setShowSelectCurrency,
  tokenList,
  setConvertToCurrency,
}) => {
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState(tokenList);
  useEffect(() => {
    if ((search != "" || search != " ") && searchList != undefined) {
      const newList = tokenList.filter((token) =>
        String(token.name).toLowerCase().includes(search.toLowerCase())
      );
      setSearchList(newList);
    }
    if((search == "" || search == " ")){
      setSearchList(tokenList);
    }
  }, [search]);
  useEffect(() => {
    setSearchList(tokenList);
  }, [tokenList]);
  return (
    <Modal
      open={showSelectCurrency}
      onClose={() => setShowSelectCurrency(false)}
      className="flex items-center justify-center"
    >
      <div className="md:w-128 w-80 h-112 bg-white rounded-2xl p-4 flex flex-col items-center">
        <div className="flex items-center justify-between p-4 border-b-4 w-full">
          <span className="font-medium text-xl">Select a Token</span>
          <button
            className="font-medium flex items-center w-min"
            onClick={() => {
              setShowSelectCurrency(false);
            }}     
            type="button"       
          >
            <VscClose size="24px" />
          </button>
        </div>
        <input
          value={search}
          placeholder="Search here..."
          onChange={(e) => setSearch(e.target.value)}     
          className="w-full bg-inputbg py-3 px-6 rounded-2xl shadow-inner text-inputText font-medium mt-4"
        />
        <div className="flex flex-col w-full items-center overflow-auto mt-2">
          {searchList.map((token, index) => {
            return (
              <button
                key={index}
                className="flex w-full h-24 items-center justify-between px-4 py-2 mb-1 border-b"
                onClick={() => {
                  setConvertToCurrency([
                    token.symbol,
                    token.name,
                    token.price,
                    token.logoURI,
                  ]);
                  setShowSelectCurrency(false);
                }}
                type="button" 
              >
                <div className="flex items-center justify-evenly mr-2">
                  <img src={token.logoURI} alt="logo" className="h-8" />
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="flex items-center font-medium text-md">
                    {token.name}
                  </span>
                  <span className="flex items-center font-base text-md text-inputText">
                    {token.symbol}
                  </span>
                </div>
                
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default SelectCurrency;
