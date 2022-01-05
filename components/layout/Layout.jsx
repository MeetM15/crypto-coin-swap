import Navbar from "../navbar/Navbar";

const Layout = ({
  children,
  setShowWalletModal,
  setShowSelectWallet,
  walletConnected,
  setWalletConnected,
}) => {
  return (
    <div className="font-sans bg-primary min-h-screen">
      <Navbar
        setShowWalletModal={setShowWalletModal}
        setShowSelectWallet={setShowSelectWallet}
        walletConnected={walletConnected}
        setWalletConnected={setWalletConnected}
      />
      {children}
    </div>
  );
};

export default Layout;
