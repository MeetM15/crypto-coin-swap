import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={"UBqH6BbpDVAL28BhtPBowcyLkM3BJBdfv12rkZtG"}
      serverUrl={"https://ouw0eboipzti.usemoralis.com:2053/server"}
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
