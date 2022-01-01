import Navbar from "../navbar/Navbar";

const Layout = ({ children, setShowWalletModal }) => {
  return (
    <div className="bg-primary min-h-screen">
      <Navbar setShowWalletModal={setShowWalletModal} />
      {children}
    </div>
  );
};

export default Layout;
