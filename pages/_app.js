import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={"c9cOrZRSOHcLqzMlGcSpRN14rMfELUGCAnEjjzQM"}
      serverUrl={"https://nzda1q6czzdo.usemoralis.com:2053/server"}
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
