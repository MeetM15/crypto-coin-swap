import Navbar from "../navbar/Navbar";

const Layout = ({ children, setShowWalletModal, setShowSelectWallet }) => {
  return (
    <div className="bg-primary min-h-screen">
      <Navbar
        setShowWalletModal={setShowWalletModal}
        setShowSelectWallet={setShowSelectWallet}
      />
      {children}
    </div>
  );
};

export default Layout;
