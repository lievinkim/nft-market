import { createContext, useState } from "react";

const MyNftContext = createContext({
  authenticated: false,
  setAuthenticated: (auth) => {},
  userAddress: null,
  setUserAddress: (address) => {},
  myNfts: [],
  totalMyNfts: 0,
  addMyNft: (myNft) => {},
  removeMyNft: (nftSheetId) => {},
  itemIsMyNft: (nftSheetId) => {},
  init: () => {},
});

export function MyNftContextProvider(props) {
  const [userMyNfts, setUserMyNfts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState(null);

  function setAuthenticatedHandler(auth) {
    return setIsConnected(auth);
  }

  function setUserAddressHandler(address) {
    return setUserAddress(address);
  }

  function addMyNftHandler(myNft) {
    if (!isConnected) {
      return alert("Please connect MetaMask!");
    }
    setUserMyNfts((prevUserMyNfts) => {
      return prevUserMyNfts.concat(myNft);
    });
  }

  function removeMyNftHandler(nftSheetId) {
    if (!isConnected) {
      return alert("Please connect MetaMask!");
    }
    setUserMyNfts((prevUserMyNfts) => {
      return prevUserMyNfts.filter((nft) => nft.sheetId !== nftSheetId);
    });
  }

  function itemIsMyNftHandler(nftSheetId) {
    return userMyNfts.some((nft) => nft.sheetId === nftSheetId);
  }

  function initHandler() {
    setUserAddress(null);
    setUserMyNfts((prevUserMyNfts) => {
      return (prevUserMyNfts = []);
    });
  }

  const context = {
    authenticated: isConnected,
    setAuthenticated: setAuthenticatedHandler,
    userAddress: userAddress,
    setUserAddress: setUserAddressHandler,
    myNfts: userMyNfts,
    totalMyNfts: userMyNfts.length,
    addMyNft: addMyNftHandler,
    removeMyNft: removeMyNftHandler,
    itemIsMyNft: itemIsMyNftHandler,
    init: initHandler,
  };

  return (
    <MyNftContext.Provider value={context}>
      {props.children}
    </MyNftContext.Provider>
  );
}

export default MyNftContext;
