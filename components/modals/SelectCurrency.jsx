import { useMoralis } from "react-moralis";
import { Paper, Modal, OutlinedInput, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { VscClose } from "react-icons/vsc";
const SelectCurrency = ({
  showSelectCurrency,
  setShowSelectCurrency,
  tokenList,
  setConvertToCurrency,
}) => {
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState(tokenList);
  useEffect(() => {
    if ((search != "" || search == " ") && searchList != undefined) {
      const newList = tokenList.filter((token) =>
        String(token.name).toLowerCase().includes(search.toLowerCase())
      );
      setSearchList(newList);
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
      <div className="md:w-128 w-80 h-160 bg-white rounded p-4 flex flex-col items-center">
        <div className="flex items-center justify-between p-4 border-b-4 w-full">
          <span className="font-bold text-lg">Select Token</span>
          <Button
            className="bg-btnRed font-bold flex items-center rounded-full w-min"
            onClick={() => {
              setShowSelectCurrency(false);
            }}
            variant="contained"
            color="info"
          >
            <VscClose size="24px" />
          </Button>
        </div>
        <OutlinedInput
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="contained"
          className="mt-2 rounded-full"
        />
        <div className="flex flex-col w-full items-center overflow-auto mt-2">
          {searchList.map((token, index) => {
            return (
              <Button
                key={index}
                className="bg-btnBlue flex w-full h-24 items-center justify-between px-4 py-2 mb-1 rounded-full"
                variant="contained"
                color={"primary"}
                onClick={() => {
                  setConvertToCurrency([
                    token.symbol,
                    token.name,
                    token.price,
                    token.logoURI,
                  ]);
                  setShowSelectCurrency(false);
                }}
              >
                <div className="w-5/6 flex items-center">
                  <span className="w-3/4 flex items-center font-bold">
                    {token.name}
                  </span>
                  <span className="w-1/4 flex items-center font-bold text-black">
                    {token.symbol}
                  </span>
                </div>
                <div className="w-1/6 flex items-center justify-end">
                  <img src={token.logoURI} alt="logo" className="h-12" />
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default SelectCurrency;
