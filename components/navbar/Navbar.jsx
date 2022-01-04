import { MdAccountBalanceWallet } from "react-icons/md";
import { Menu, MenuItem, Button } from "@mui/material";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import { IoMdWallet } from "react-icons/io";

const Navbar = ({
  setShowWalletModal,
  setShowSelectWallet,
  walletConnected,
  setWalletConnected,
}) => {
  const { web3, isWeb3Enabled } = useMoralis();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(anchorEl != null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };
  return (
    <nav className="bg-secondary relative w-full shadow px-2 sm:px-6 lg:px-8 flex items-center justify-between h-12 text-white">
      <div className="flex-shrink-0 flex items-center">
        <img
          className="block lg:hidden h-8 w-auto p-1.5"
          src="/vercel.svg"
          alt="logo"
        />
        <img
          className="hidden lg:block h-8 w-auto p-1.5"
          src="/vercel.svg"
          alt="logo"
        />
      </div>

      {web3.currentProvider &&
      (web3.currentProvider.accounts || web3.currentProvider.selectedAddress) &&
      isWeb3Enabled &&
      walletConnected ? (
        <div className="flex items-center pr-2 ">
          <Button
            id="basic-button"
            onClick={handleClick}
            variant="contained"
            className="bg-btnBlue"
            color="info"
          >
            <span className="font-bold w-32 flex items-center justify-center">
              <span className="flex items-center justify-center truncate w-full text-white">
                {web3.currentProvider.isMetaMask
                  ? `${String(web3.currentProvider.selectedAddress).substring(
                      0,
                      4
                    )}...
                  ${String(web3.currentProvider.selectedAddress).substring(
                    String(web3.currentProvider.selectedAddress).length - 4
                  )}`
                  : `${String(web3.currentProvider.accounts[0]).substring(
                      0,
                      4
                    )}...
                  ${String(web3.currentProvider.accounts[0]).substring(
                    String(web3.currentProvider.accounts[0]).length - 4
                  )}`}
              </span>
              <IoMdWallet className="text-white ml-2" size="24px" />
            </span>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                setShowWalletModal(true);
                setMenuOpen(false);
              }}
            >
              Open Wallet
            </MenuItem>
            <MenuItem
              onClick={() => {
                setWalletConnected(false);
                setMenuOpen(false);
              }}
            >
              Disconnect
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <div className="flex items-center justify-between pr-2 ">
          <Button
            onClick={() => {
              setShowSelectWallet(true);
            }}
            variant="contained"
            className="bg-btnBlue font-bold"
            color="info"
          >
            Connect Wallet
            <MdAccountBalanceWallet className="text-white ml-2" size="24px" />
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
