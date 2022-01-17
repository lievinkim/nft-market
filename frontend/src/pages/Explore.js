import { useState, useEffect } from "react";
import "../App.css";

import Cards from "../components/nft/Cards";

function ExplorePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedNfts, setLoadedNfts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/nfts", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const nfts = [];
        for (const key in data) {
          const nft = {
            ...data[key],
          };
          nfts.push(nft);
        }

        setIsLoading(false);
        setLoadedNfts(nfts);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <div>
          <h1>Loading...</h1>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div>
        <h1>Explore</h1>
      </div>
      <Cards nfts={loadedNfts} />
    </section>
  );
}

export default ExplorePage;
