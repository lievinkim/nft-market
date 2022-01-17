import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards(props) {
  return (
    <div className="cards">
      <div className="cards__container">
        <div className="cards__wrapper">
          {props.nfts.map((nft) => (
            <CardItem
              key={nft.key}
              src="https://shop.kosangas.dk/images/products//defaultproduct.gif"
              sheetId={nft.sheetId}
              name={nft.name}
              nameEng={nft.nameEng}
              rarity={nft.rarity}
              owner={nft.owner}
              path="/"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
