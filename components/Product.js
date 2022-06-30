import React from "react";
import Buy from "./Buy";

export default function Product({ product }) {
  const { id, name, price, description, image_url } = product;

  return (
    <div className="hover:scale-110 transition duration-150 flex flex-col justify-evenly items-center max-w-[320px] h-[400px] bg-[#341547] rounded-[16px] mr-[10px]">

      <div >
        <img className="max-w-[140px] max-h-[110px] m-[70px]" src={image_url} alt={name} />
      </div>

      <div className="flex w-full h-full p-3 rounded-b-[16px] bg-[#240f30]">
        <div className="flex flex-col justify-center mb-[30px]">
          <div className="font-bold mb-[12px] text-xl text-white">{name}</div>
          <div className="text-[#BAB8B8] w-[130px] truncate">{description}</div>
        </div>

        <div className="flex flex-col p-3 items-center w-full h-full">
          <div className="text-[1.0rem] font-bold text-white mb-4">{price} USDC</div>
          <Buy itemID={id} />
        </div>
      </div>
    
    </div>
  );
}