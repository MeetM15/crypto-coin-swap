import { Modal } from "@mui/material";
import { useState } from "react";
const pass = "1234";
const Password = ({ showLoginModal, setShowLoginModal }) => {
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  return (
    <Modal
      open={showLoginModal}
      disableEscapeKeyDown
      disableAutoFocus
      onClose={(e, reason) => {
        if (reason != "backdropClick") setShowLoginModal(false);
      }}
      className="flex items-center justify-center">
      <div className="md:w-128 w-80 h-min-96 bg-white rounded-2xl p-8 flex flex-col items-center">
        <span className="w-full font-medium text-lg text-center mb-4 ">
          Login
        </span>
        <form>
          <div className="w-full">
            <input
              placeholder="password"
              className="w-full bg-inputbg py-3 px-6 rounded-xl shadow-inner text-inputText font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showError && (
              <span className="w-full font-medium text-red-800 text-xs ">
                Incorrect Password!
              </span>
            )}
          </div>
          <button
            className="border-2 border-btnBlue text-xs font-medium px-3 py-3 flex rounded-lg items-center justify-center text-btnBlue w-full mt-2"
            onClick={() => {
              if (password == pass) {
                setShowLoginModal(false);
                setShowError(false);
              } else setShowError(true);
            }}
            type="button">
            Login
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default Password;
