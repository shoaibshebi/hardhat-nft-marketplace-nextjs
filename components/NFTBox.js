import { useState, useEffect } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import nftMarketplaceAbi from "../constants/NftMarketplace.json";
import nftAbi from "../constants/BasicNft.json";
import Image from "next/image";
import { Card, useNotification } from "web3uikit";
import { ethers } from "ethers";
import UpdateListingModal from "./UpdateListingModal";

const truncateStr = (fullStr, strLen) => {
  if (fullStr.length <= strLen) return fullStr;

  const separator = "...";
  const seperatorLength = separator.length;
  const charsToShow = strLen - seperatorLength;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return (
    fullStr.substring(0, frontChars) +
    separator +
    fullStr.substring(fullStr.length - backChars)
  );
};

export default function NFTBox({
  price,
  nftAddress,
  tokenId,
  marketplaceAddress,
  seller,
}) {
  const { isWeb3Enabled, account } = useMoralis();
  // const { isWeb3Enabled, account } = {
  //   isWeb3Enabled: true,
  //   account: "",
  // };
  const [imageURI, setImageURI] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenDescription, setTokenDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const hideModal = () => setShowModal(false);
  const dispatch = useNotification();

  console.log("tokeid ", tokenId);
  const { runContractFunction: getTokenURI } = useWeb3Contract({
    abi: nftAbi,
    contractAddress: nftAddress,
    functionName: "tokenURI",
    params: {
      tokenId: tokenId,
    },
  });
  const { runContractFunction: buyItem } = useWeb3Contract({
    abi: nftMarketplaceAbi,
    contractAddress: marketplaceAddress,
    functionName: "buyItem",
    msgValue: price,
    params: {
      nftAddress: nftAddress,
      tokenId: tokenId,
    },
  });

  async function updateUI() {
    const tokenURI = await getTokenURI();
    console.log(`The TokenURI is ${tokenId} ${tokenURI}`);
    // We are going to cheat a little here...
    if (tokenURI) {
      // IPFS Gateway: A server that will return IPFS files from a "normal" URL.
      const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      console.log("requestURL ", requestURL);
      let tokenURIResponse;
      try {
        // tokenURIResponse = await (await fetch(requestURL)).json();
        tokenURIResponse = {
          image: tokenURI,
          name: "Pop Munkey NFT",
          description: "Pop Munkey NFT, looking Yoooo!",
        };
        console.log("tokenURIResponse ", tokenURIResponse);
        const imageURI = tokenURIResponse.image;
        const imageURIURL = imageURI.replace(
          "ipfs://",
          "https://ipfs.io/ipfs/"
        );
        setImageURI(imageURIURL);
        setTokenName(tokenURIResponse.name);
        setTokenDescription(tokenURIResponse.description);
      } catch (error) {
        console.log("err ", error);
      }
    }
  }
  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  // debugger;
  const isOwnedByUser = seller === account || seller === undefined;
  const formattedSellerAddress = isOwnedByUser
    ? "you"
    : truncateStr(seller || "", 15);

  const handleCardClick = () => {
    isOwnedByUser
      ? setShowModal(true)
      : buyItem({
          onError: (error) => console.log(error),
          onSuccess: handleBuyItemSuccess,
        });
  };

  const handleBuyItemSuccess = async (tx) => {
    await tx.wait(1);
    dispatch({
      type: "success",
      message: "Item bought!",
      title: "Item Bought",
      position: "topR",
    });
  };

  return (
    <div>
      <div>
        {imageURI ? (
          // <div style={{ margin: "0px 10px" }}>
          <div className="m-10">
            <UpdateListingModal
              isVisible={showModal}
              tokenId={tokenId}
              marketplaceAddress={marketplaceAddress}
              nftAddress={nftAddress}
              onClose={hideModal}
            />
            <Card
              title={tokenName}
              description={tokenDescription}
              onClick={handleCardClick}
            >
              <div className="p-2">
                <div className="flex flex-col items-center gap-2">
                  <div>#{tokenId}</div>
                  <div className="italic text-sky-500">
                    Owned by {formattedSellerAddress}
                  </div>
                  <p className="text-center">
                    <Image
                      loader={() => imageURI}
                      src={imageURI}
                      height="200"
                      width="200"
                    />
                  </p>
                  <div className="font-bold">
                    {ethers.utils.formatUnits(price, "ether")} ETH
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
