import Link from "next/link";
import { useEffect, useState } from "react";
import { ConnectButton } from "web3uikit";

export default function Header() {
  const [loadButton, setLoadButton] = useState(false);
  useEffect(() => {
    setLoadButton(true);
  }, []);
  return (
    <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
      <h1 className="py-4 px-4 font-bold text-3xl">NFT Marketplace</h1>
      <div className="flex flex-row items-center">
        <Link href="/">
          <a className="mr-4 p-6">Home</a>
        </Link>
        <Link href="/sell-nft">
          <a className="mr-4 p-6">Sell NFT</a>
        </Link>
        {loadButton && <ConnectButton moralisAuth={false} />}
      </div>
    </nav>
  );
}
