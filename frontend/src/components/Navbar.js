import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";

import MyNftContext from "../store/my-nft-context";

function Navbar() {
  const myNftCtx = useContext(MyNftContext);
  const isConnected = myNftCtx.authenticated;

  // Connect Wallet
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect");

  const connectWalletHandler = () => {
    if (window.ethereum) {
      if (!isConnected) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((result) => {
            accountChangedHandler(result[0]);
            setConnButtonText("Disconnect");
            myNftCtx.setAuthenticated(true);
            myNftCtx.setUserAddress(result[0]);
          });
      } else {
        setDefaultAccount(null);
        setUserBalance(null);
        setConnButtonText("Connect");
        myNftCtx.setAuthenticated(false);
        myNftCtx.init();
      }

      window.ethereum.on("accountsChanged", accountChangedHandler);
      window.ethereum.on("chainChanged", chainChangedHandler);
    } else {
      if (window.confirm("Do you want to install MetaMask?")) {
        let win = window.open("https://metamask.io/download", "_blank");
        win.focus();
      }
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount.toString());
  };

  const getUserBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  let style = {
    textAlign: "center",
  };

  return (
    <div>
      <div style={style}>
        <p>Address: {defaultAccount}</p>
        <p>Balance: {userBalance}</p>
      </div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            CRYPTO ROOM
          </Link>

          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/mynft" className="nav-links" onClick={closeMobileMenu}>
                My NFT
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/nftminting"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                NFT Minting
              </Link>
            </li>

            <li>
              <Link
                to="/connect"
                className="nav-links-mobile"
                onClick={(closeMobileMenu, connectWalletHandler)}
              >
                {connButtonText}
              </Link>
            </li>
          </ul>
          {button && (
            <Button buttonStyle="btn--outline" onClick={connectWalletHandler}>
              {connButtonText}
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
