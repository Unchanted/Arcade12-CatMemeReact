"use client";
import React, { useState, useEffect } from 'react';
import { Boxes } from "./components/ui/background-boxes.tsx";
import { BackgroundGradient } from "./components/ui/background-gradient.tsx"
import {cn} from "./utils/cn.ts";
import './index.css'; 

const catPhrases = [
  "I fits, I sits",
  "Meow you doin'?",
  "Paw-don me!",
  "You've got to be kitten me!",
  "I'm not feline it today",
  "Purr-fection!",
  "Cat-ch you later!",
  "Meow or never",
  "Fur-get about it!",
  "Claw-some!",
  "Are you kitten me right meow?",
  "I'm pawsitively excited!",
  "You're the cat's pajamas",
  "I'm having a paw-some day!",
  "Stop right meow!",
  "I'm feline fine",
  "Cat-itude is everything",
  "You're purr-fect just the way you are",
  "I'm not kitten around",
  "Whisker me away",
  "Stay pawsitive!",
  "Meow's it going?",
  "Fur-ocious and fabulous",
  "I'm feline lucky today",
  "Have a meow-velous day!",
  "Purr-haps we should take a catnap",
  "You're the purr-fect friend",
  "I'm not lion, you're amazing!",
  "Meow-za! That's incredible!",
  "I'm just kitten around"
];

function App() {
  const [meme, setMeme] = useState({ imageUrl: '', phrase: '', width: 0, height: 0 });
  const [memeCount, setMemeCount] = useState(0);
  const [customText, setCustomText] = useState('');

  const generateMeme = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();
      const randomPhrase = catPhrases[Math.floor(Math.random() * catPhrases.length)];
      
      // Create a new Image object to get the dimensions
      const img = new Image();
      img.onload = () => {
        setMeme({ 
          imageUrl: data[0].url, 
          phrase: randomPhrase,
          width: img.width,
          height: img.height
        });
      };
      img.src = data[0].url;
      
      setMemeCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error('Error fetching cat image:', error);
    }
  };

  useEffect(() => {
    generateMeme();
  }, []);

  return (

    <div className="min-h-screen flex overflow-hidden bg-slate-900 -z-20 flex-col items-center justify-center p-4">
    <div>
      <Boxes />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Cat Meme Generator</h1>
        <p className="text-center text-gray-600 mb-6">Create hilarious cat memes with just one click!</p>
        <BackgroundGradient className = "rounded-[22px] max-w-sm p4 sm:p-10 bg-white dark:bg-zinc900">
        {meme.imageUrl && (
          <div className="relative mb-6 overflow-hidden rounded-lg" style={{maxHeight: '70vh'}}>
            <img 
              src={meme.imageUrl} 
              alt="Random cat" 
              className="w-full h-auto object-contain"
              style={{maxHeight: '70vh'}}
            />
            <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center text-2xl font-bold">
              {customText || meme.phrase}
            </p>
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="customText" className="block text-sm font-medium text-gray-700 mb-2">
            Add your own text!!!!:
          </label>
          <input
            type="text"
            id="customText"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your own meme text"
          />
        </div>
        
        <button
          onClick={generateMeme}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition duration-300 mb-4"
        >
          Generate New Meme
        </button>
        
        <p className="text-center text-gray-600">
          Memes generated: <span className="font-bold">{memeCount}</span>
        </p>
        </BackgroundGradient>
      </div>
      </div>
    </div>
  );
}

export default App;

