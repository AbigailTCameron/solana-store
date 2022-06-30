import React, { useState } from "react";
import { create } from "ipfs-http-client";
import styles from "../styles/CreateProduct.module.css";

const client = create("https://ipfs.infura.io:5001/api/v0");

const CreateProduct = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image_url: "",
        description: "",
    });
    const [file, setFile] = useState({});
    const [uploading, setUploading] = useState(false);

    async function onChange(e) {
        setUploading(true);
        const files = e.target.files;
        try {
          console.log(files[0]);
          const added = await client.add(files[0]);
          setFile({ filename: files[0].name, hash: added.path });
        } catch (error) {
          console.log("Error uploading file: ", error);
        }
        setUploading(false);
    }

    const createProduct = async () => {
        try {
          // Combine product data and file.name
          const product = { ...newProduct, ...file };
          console.log("Sending product to api",product);
          const response = await fetch("../api/addProducts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          });
          const data = await response.json();
          if (response.status === 200) {
            alert("Product added!");
          }
          else{
            alert("Unable to add product: ", data.error);
          }
    
        } catch (error) {
          console.log(error);
        }
    };

    return(
        <div className="top-0 left-0 w-[100%] h-[100%] fixed bg-gradient-to-r to-purple-900 from-black">
            <div className="flex fixed top-[50%] left-[50%] -mt-[250px] -ml-[250px] justify-center items-center">
                <div className="text-white flex flex-col">

                    <header className="bg-purple-700 rounded-t-[10px] px-[150px] text-center">
                        <h1>Create Product</h1>
                    </header>

                    <div className="flex flex-col p-[20px] bg-gradient-to-r from-[#cd640b] to-[#1d1160] rounded-b-[10px]">
                        <input
                            type="file"
                            className="cursor-pointer h-[80px] w-[100%] flex justify-center items-center"
                            accept=".zip,.rar,.7zip"
                            placeholder="Emojis"
                            onChange={onChange}
                        />
                        {file.name != null && <p className="file-name">{file.filename}</p>}


                        <div className="flex justify-between">
                            <input
                                className="bg-[#2E2E2E] border-none text-[1.1rem] p-[15px] rounded-md text-white outline-none box-border my-[10px] w-[48%]"
                                type="text"
                                placeholder="Product Name"
                                onChange={(e) => {
                                setNewProduct({ ...newProduct, name: e.target.value });
                                }}
                            />
                            <input
                                className="bg-[#2E2E2E] border-none text-[1.1rem] p-[15px] rounded-md text-white outline-none box-border my-[10px] w-[48%]"
                                type="text"
                                placeholder="0.01 USDC"
                                onChange={(e) => {
                                setNewProduct({ ...newProduct, price: e.target.value });
                                }}
                            />
                        </div>

                        <div className="flex justify-between">
                            <input
                                className="w-[100%] bg-[#2E2E2E] border-none text-[1.1rem] p-[15px] rounded-md text-white outline-none box-border my-[10px]"
                                type="url"
                                placeholder="Image URL ex: https://i.imgur.com/rVD8bjt.png"
                                onChange={(e) => {
                                setNewProduct({ ...newProduct, image_url: e.target.value });
                                }}
                            />
                        </div> 

                        <textarea
                            className="w-[100%] min-h-[100px] resize-none bg-[#2E2E2E] text-[1.1rem] p-[15px] rounded-md text-white outline-none border-none box-border my-[10px]"
                            placeholder="Description here..."
                            onChange={(e) => {
                                setNewProduct({ ...newProduct, description: e.target.value });
                            }}
                        />    

                        <button
                            className="text-[18px] rounded-lg p-[10px] self-start my-[10px] text-black bg-white w-[99%] duration-200 hover:text-white hover:bg-purple-900"
                            onClick={() => {
                                createProduct();
                            }}
                            disabled={uploading}
                            >
                            Create Product 
                        </button>
                        

                    </div>

                </div>

            </div>

        </div>
    )
}

export default CreateProduct;