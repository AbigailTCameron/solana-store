import React, {useState, useEffect} from "react";
import HeadComponent from '../components/Head';
import Product from "../components/Product";
import { useWallet } from '@solana/wallet-adapter-react';
import HomeScreen from '../components/HomeScreen';
import ProductScreen from "../components/ProductScreen";


const App = () => {
  // This will fetch the users' public key (wallet address) from any wallet we support
  const { publicKey } = useWallet();
  const [products, setProducts] = useState([]);


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


  // const renderItemByContainer = () => (
  //   <div className="products-container">
  //     {products.map((product) => (
  //       <Product key={product.id} product={product} />
  //     ))}
  //   </div>
  // );
  
  
  return (
    <div className="w-screen h-screen font-['Courier']">
      <HeadComponent/>
      {publicKey? <ProductScreen products={products}/> : <HomeScreen/>}
    </div>
  );
};

export default App;
