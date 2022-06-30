import React, {useState, useEffect} from "react";
import HeadComponent from '../components/Head';
import { useWallet } from '@solana/wallet-adapter-react';
import HomeScreen from '../components/HomeScreen';
import ProductScreen from "../components/ProductScreen";
import CreateProduct from "../components/CreateProduct";


const App = () => {
  // This will fetch the users' public key (wallet address) from any wallet we support
  const { publicKey } = useWallet();
  const [products, setProducts] = useState([]);

  const isOwner = ( publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false );
  const [creating, setCreating] = useState(false);


  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          console.log("Products", data);
        });
    }
  }, [publicKey]);
  
  return (
    <div className="w-screen h-screen font-['Courier']">
      <HeadComponent/>
      {isOwner && (
            <button className="create-product-button" onClick={() => setCreating(!creating)}>
              {creating ? "Close" : "Create Product +"}
            </button>
          )}

      {creating && <CreateProduct />}
      {publicKey? <ProductScreen products={products}/> : <HomeScreen />}
    </div>
  );
};

export default App;
