import { useState, useContext } from "react";
import "../App.css";
import { Button } from "../components/Button";
import MyNftContext from "../store/my-nft-context";

export default function NftMintingPage() {
  const myNftCtx = useContext(MyNftContext);
  const isConnected = myNftCtx.authenticated;

  const [isLoading, setIsLoading] = useState(false);
  const [loadedNft, setLoadedNft] = useState();

  function mintNftHandler() {
    if (!isConnected) {
      return alert("Please install MetaMask!");
    }

    setIsLoading(true);

    const url = "http://15.165.75.155:8000/nfts/mint/";
    const owner = myNftCtx.userAddress;

    fetch(url + owner, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setLoadedNft(data);
      });
  }

  let content;

  if (isLoading) {
    content = (
      <div className="cards">
        <div className="cards__item">
          <div className="cards__item__link">
            <figure className="cards__item__pic-wrap" data-category="-">
              <img
                className="cards__item__img"
                alt="Item"
                src="https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif"
              />
            </figure>
            <div className="cards__item__info">
              <h5 className="cards__item__text">아이템 : </h5>
              <p>희귀도 : </p>
            </div>

            <Button
              className="btns"
              buttonStyle="btn--secondary"
              buttonSize="btn--add"
            >
              Mint for 1.00 ETH
            </Button>
          </div>
        </div>
      </div>
    );
  } else if (loadedNft) {
    content = (
      <div className="cards">
        <div className="cards__item">
          <div className="cards__item__link">
            <figure
              className="cards__item__pic-wrap"
              data-category={loadedNft.sheetId}
            >
              <img
                className="cards__item__img"
                alt="Item"
                src="https://shop.kosangas.dk/images/products//defaultproduct.gif"
              />
            </figure>
            <div className="cards__item__info">
              <p>
                아이템 : {loadedNft.name} / {loadedNft.nameEng}
              </p>
              <p>희귀도 : {loadedNft.rarity}</p>
            </div>

            <Button
              className="btns"
              buttonStyle="btn--secondary"
              buttonSize="btn--add"
              onClick={mintNftHandler}
            >
              Mint for 1.00 ETH
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="cards">
        <div className="cards__item">
          <div className="cards__item__link">
            <figure className="cards__item__pic-wrap" data-category="-">
              <img
                className="cards__item__img"
                alt="Item"
                src="https://shop.kosangas.dk/images/products//defaultproduct.gif"
              />
            </figure>
            <div className="cards__item__info">
              <h5 className="cards__item__text">아이템 : </h5>
              <p>희귀도 : </p>
            </div>

            <Button
              className="btns"
              buttonStyle="btn--secondary"
              buttonSize="btn--add"
              onClick={mintNftHandler}
            >
              Mint for 1.00 ETH
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <section>
      <div>
        <div>
          <h1>MINT YOUR FURNITURE NOW!</h1>
        </div>

        {content}
      </div>
    </section>
  );
}
