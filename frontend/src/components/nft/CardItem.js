import { useContext } from "react";
import MyNftContext from "../../store/my-nft-context";
import { Link } from "react-router-dom";

import { Button } from "../Button";

function CardItem(props) {
  const myNftCtx = useContext(MyNftContext);
  const itemIsMyNft = myNftCtx.itemIsMyNft(props.sheetId);

  function toggleMyNftStatusHandler() {
    if (itemIsMyNft) {
      myNftCtx.removeMyNft(props.sheetId);
    } else {
      myNftCtx.addMyNft({
        sheetId: props.sheetId,
        name: props.name,
        nameEng: props.nameEng,
        rarity: props.rarity,
        owner: props.owner,
      });
    }
  }

  let style = {
    lineBreak: "anywhere",
  };

  return (
    <div className="cards__item">
      <div className="cards__item__link">
        <Link to={props.path}>
          <figure
            className="cards__item__pic-wrap"
            data-category={props.sheetId}
          >
            <img className="cards__item__img" alt="Item" src={props.src} />
          </figure>
          <div className="cards__item__info">
            <h5 className="cards__item__text">{props.name}</h5>
            <h5 className="cards__item__text">{props.nameEng}</h5>
            <p>희귀도 : {props.rarity}</p>
            <p style={style}>소유자 주소 : {props.owner}</p>
          </div>
        </Link>
        <Button
          className="btns"
          buttonStyle="btn--secondary"
          buttonSize="btn--add"
          onClick={toggleMyNftStatusHandler}
        >
          {itemIsMyNft ? "Sell NFT" : "Buy NFT"}
        </Button>
      </div>
    </div>
  );
}

export default CardItem;
