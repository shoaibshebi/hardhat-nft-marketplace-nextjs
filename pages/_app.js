import { MoralisProvider } from "react-moralis";
import Header from "../components/Header";
import Head from "next/head";
import { NotificationProvider } from "web3uikit";
import "../styles/globals.css";

const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>NFT Marketplace</title>
        <meta name="description" content="NFT Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NotificationProvider>
        <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
          <Header />
          <Component {...pageProps} />
        </MoralisProvider>
      </NotificationProvider>
    </div>
  );
}

export default MyApp;
