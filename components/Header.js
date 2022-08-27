import { ConnectButton } from "web3uikit";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <nav className="p-5 py-2 border-b-2 flex flex-row justify-between items-center w-full">
      <h1 className="py-2 px-4 font-bold text-3xl">NFT Marketplace</h1>
      <div
        className="flex flex-row items-center"
        style={{ padding: "20px 0px", display: "flex", flexDirection: "row" }}
      >
        <Link href="/">
          <a
            className={`mr-4 py-2 px-6 rounded-full ${
              currentRoute == "/" ? "bg-cyan-100" : "bg-none"
            }`}
          >
            Home
          </a>
        </Link>
        <Link href="/bought-nfts">
          <a
            className={`mr-4 py-2 px-6 rounded-full ${
              currentRoute == "/bought-nfts" ? "bg-cyan-100" : "bg-none"
            }`}
          >
            Bought NFTs
          </a>
        </Link>
        <Link href="/sell-nft">
          <a
            className={`mr-4 py-2 px-6 rounded-full ${
              currentRoute == "/sell-nft" ? "bg-cyan-100" : "bg-none"
            }`}
          >
            Sell NFT
          </a>
        </Link>
        <ConnectButton moralisAuth={false} />
      </div>
    </nav>
  );
}
