import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

//Wallet Public Key - 48MFndJCHYZERsvGx5V5ZchzNikHu8DHYBRbYcG8oTz5
// Constants
const TWITTER_HANDLE = 'King_Had3s';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  const [walletaddress, setWalletAddress] = useState(null);
  const checkIfWalletIsConnected = async () => {
    try{
      const { solana } = window;
      
      if(solana) {
        if(solana.isPhantom) {
          console.log("Phantom Wallet found!");

          /*
         * The solana object gives us a function that will allow us to connect
         * directly with the user's wallet!
         */
          // similar to check whether the user is logged in or not 
          const response = await solana.connect({onlyIfTrusted : true});
          console.log(
            'Connected with Public Key : ',
            response.publicKey.toString()
          );
          
         setWalletAddress(response.publicKey.toString());
        } else {
          alert("Solana object not found! Get a Phantom Wallet 👻");
        }
      }

    } catch(err){
      console.log(err);
    }
  }

  const connectWallet = async () => {
    const { solana } = window;
    
    if(solana){
      const response = await solana.connect();
      console.log(response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className='cta-button connect-wallet-button'
      onClick={connectWallet}
    >
      Connect to Wallet 
    </button>
  )

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🥷 Naruto NFT Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {!walletaddress && renderNotConnectedContainer()}
        </div>
        {/* Check for walletAddress and then pass in walletAddress */}
        {walletaddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by ❤️ @${TWITTER_HANDLE} on 🦄`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
