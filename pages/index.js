import NFTBox from "../components/NFTBox";
import { useMoralisQuery, useMoralis } from "react-moralis";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { isWeb3Enabled } = useMoralis();
  // const { isWeb3Enabled } = { isWeb3Enabled: true };
  const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
    // TableName
    // Function for the query
    "ActiveItem",
    (query) => query.limit(10).ascending("tokenId")
  );
  console.log("listedNfts", listedNfts, isWeb3Enabled);

  return (
    <div className="container mx-auto ">
      <h1 className="py-4 px-4 font-bold text-2xl text-center">
        Recently Listed
      </h1>
      <div className="container flex items-center content-center">
        {isWeb3Enabled ? (
          fetchingListedNfts ? (
            <div>Loading...</div>
          ) : (
            listedNfts.map((nft) => {
              const { price, nftAddress, tokenId, marketplaceAddress, seller } =
                nft.attributes;
              return (
                <>
                  <NFTBox
                    price={price}
                    nftAddress={nftAddress}
                    tokenId={tokenId}
                    marketplaceAddress={marketplaceAddress}
                    seller={seller}
                    key={`${nftAddress}${tokenId}`}
                  />
                </>
              );
            })
          )
        ) : (
          <div>Web3 Currently Not Enabled</div>
        )}
      </div>
    </div>
  );
}
