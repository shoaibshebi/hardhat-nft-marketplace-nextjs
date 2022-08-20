import { ConnectButton } from "web3uikit";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="p-5 py-0 border-b-2 flex flex-row justify-between items-center w-full">
      <h1 className="py-2 px-4 font-bold text-3xl">NFT Marketplace</h1>
      <div
        className="flex flex-row items-center"
        style={{ padding: "20px 0px", display: "flex", flexDirection: "row" }}
      >
        <Link href="/">
          <a className="mr-4 p-6">Home</a>
        </Link>
        <Link href="/bought-nfts">
          <a className="mr-4 p-6">Bought NFTs</a>
        </Link>
        <Link href="/sell-nft">
          <a className="mr-4 p-6">Sell NFT</a>
        </Link>
        <ConnectButton moralisAuth={false} />
      </div>
    </nav>
  );
}
