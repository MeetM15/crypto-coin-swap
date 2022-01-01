import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={"Favl9i6hQohZGswS70x4316QPljhvUvqzwkvPSVb"}
      serverUrl={"https://ribgi8fokqqx.usemoralis.com:2053/server"}
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
