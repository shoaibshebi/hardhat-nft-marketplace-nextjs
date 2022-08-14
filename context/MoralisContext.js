import { MoralisProvider } from "react-moralis";

const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function MoralisContextProvider({ children }) {
  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      {children}
    </MoralisProvider>
  );
}
