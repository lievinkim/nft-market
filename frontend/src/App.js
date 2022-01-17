import { Routes, Route } from "react-router-dom";

import ExplorePage from "./pages/Explore";
import MyNftPage from "./pages/MyNft";
import NftMintingPage from "./pages/NftMinting";
import Layout from "./components/layout/Layout";
import "./App.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ExplorePage />} />
        <Route path="/mynft" element={<MyNftPage />} />
        <Route path="/nftminting" element={<NftMintingPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
