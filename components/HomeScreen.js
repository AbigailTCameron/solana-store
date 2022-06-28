import React, {useState, useEffect} from "react";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// Constants
const SOLANA_LINK = "https://solana.com/";
const HomeScreen = () => {
    const emojisTop = ["🥹", "😍"];
    const emojisMiddle = ["🫠", "🤪"];
    const emojisBottom = ["😭", "🤓"];  

    const toneEmojisMiddle = ["👋🏾", "👩🏾", "🤦🏾‍♀️"]; 
    const toneEmojisBottom = ["💃🏾", "🧖🏾‍♀️", "👩🏾‍💻"];

    const foodEmojis = ["🐒", "🍎", "🍔", "🌈"];
    
    const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0); 
    const [currentToneEmojiIndex, setCurrentToneEmojiIndex] = useState(0); 
    const [currentRandomEmojiIndex, setCurrentRandomEmojiIndex] = useState(0); 

    useEffect(() =>{
        const emoji_id = setTimeout(() =>{
            setCurrentEmojiIndex((currentEmojiIndex + 1) % emojisTop.length)
            setCurrentToneEmojiIndex((currentToneEmojiIndex + 1) % toneEmojisMiddle.length)
            setCurrentRandomEmojiIndex((currentRandomEmojiIndex + 1) % foodEmojis.length);
        }, 1000); 
    
        return() => {
            clearInterval(emoji_id);
        }; 
    }, [currentEmojiIndex, currentToneEmojiIndex, currentRandomEmojiIndex]);

    return (
        <div className="h-screen w-screen text-center bg-gradient-to-r to-purple-900 from-black">
            <div className="h-full flex p-8 relative text-white">

                <header className="m-8">
                    <p className="text-[150px] text-pink-600 font-bold text-left">EMOJI</p>
                    <p className="text-[90px] -mt-20 font-medium text-left">MARKETPLACE</p>
                    <p className="text-[25px] mb-14 text-left font-light">We accept all your useless and wacky emojis</p>
                    <div className="mt-[20px]">
                        <WalletMultiButton className="h-[45px] px-[40px] rounded-lg cursor-pointer text-[16px] font-bold text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 max-w-[300px]" />
                    </div>   
                </header>

                <main className="ml-[150px] mt-[55px]">
                    <div className="flex items-end space-x-1">
                        {/*Level one of the pyramid*/}
                        <div className="flex flex-col space-y-1">
                            <div className="text-[120px]  py-10 w-[177px] bg-gradient-to-r from-indigo-500 rounded-lg">
                                {foodEmojis[currentRandomEmojiIndex]}
                            </div>
                        </div>

                        {/*Level two of the pyramid*/}
                        <div className="flex flex-col space-y-1">
                            <div className="text-[120px]  py-10 w-[177px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
                                {toneEmojisMiddle[currentToneEmojiIndex]}
                            </div>
                            <div className="text-[120px]  py-10 w-[177px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
                                {toneEmojisBottom[currentToneEmojiIndex]}
                            </div>
                        </div>

                        {/*Level three of the pyramid*/}
                        <div className="flex flex-col space-y-1">
                            <div className="text-[120px]  py-10 w-[177px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                                {emojisTop[currentEmojiIndex]}
                            </div>
                            <div className="text-[120px]  py-10 w-[177px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                                {emojisMiddle[currentEmojiIndex]}
                            </div>
                            <div className="text-[120px]  py-10 w-[177px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                                {emojisBottom[currentEmojiIndex]}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <footer className="flex justify-center items-center absolute bottom-0 w-full pb-[20px]">
                <img alt="Solana Logo" className="w-[35px] h-[35px]" src="solana_logo.png" />
                <a
                    className="text-[16px] font-bold text-white"
                    href={SOLANA_LINK}
                    target="_blank"
                    rel="noreferrer"
                >{`runs on the Solana network`}</a>
            </footer>
        
        </div>

    );

}

export default HomeScreen;