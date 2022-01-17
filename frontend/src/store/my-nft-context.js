import { createContext, useState } from "react";

const MyNftContext = createContext({
  myNfts: [],
  totalMyNfts: 0,
  addMyNft: (myNft) => {},
  removeMyNft: (nftSheetId) => {},
  itemIsMyNft: (nftSheetId) => {},
});

export function MyNftContextProvider(props) {
  const [userMyNfts, setUserMyNfts] = useState([]);

  function addMyNftHandler(myNft) {
    setUserMyNfts((prevUserMyNfts) => {
      return prevUserMyNfts.concat(myNft);
    });
  }

  function removeMyNftHandler(nftSheetId) {
    setUserMyNfts((prevUserMyNfts) => {
      return prevUserMyNfts.filter((nft) => nft.sheetId !== nftSheetId);
    });
  }

  function itemIsMyNftHandler(nftSheetId) {
    console.log(nftSheetId);
    return userMyNfts.some((nft) => nft.sheetId === nftSheetId);
  }

  const context = {
    myNfts: userMyNfts,
    totalMyNfts: userMyNfts.length,
    addMyNft: addMyNftHandler,
    removeMyNft: removeMyNftHandler,
    itemIsMyNft: itemIsMyNftHandler,
  };

  return (
    <MyNftContext.Provider value={context}>
      {props.children}
    </MyNftContext.Provider>
  );
}

export default MyNftContext;
