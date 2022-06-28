import React, {useState, useEffect} from "react";
import Product from "./Product";

const ProductScreen = ({products}) => {
    return(
        <div className="h-screen w-screen bg-[#150221] p-20">
            <p className="text-white text-5xl p-10 font-extrabold">🔥 Hot Items</p>
            <div className="h-screen w-screen bg-[#150221] flex flex-wrap">
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>

        </div>
      

    );
}

export default ProductScreen;