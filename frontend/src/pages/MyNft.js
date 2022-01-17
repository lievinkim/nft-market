import { useContext } from "react";
import MyNftContext from "../store/my-nft-context";
import Cards from "../components/nft/Cards";

import "../App.css";

export default function MyNftPage() {
  const myNftCtx = useContext(MyNftContext);

  let content;

  if (myNftCtx.totalMyNfts === 0) {
    content = (
      <div className="cards">You got no NFTs yet. Start adding some?</div>
    );
  } else {
    content = <Cards nfts={myNftCtx.myNfts} />;
  }

  return (
    <section>
      <div>
        <h1>My NFT</h1>
        {content}
      </div>
    </section>
  );
}
