import React, { useState,useContext } from 'react';
import '../App.css'; 
import { useNavigate } from 'react-router-dom';
import { abi } from './abi'; 
import { ethers } from 'ethers';
import { WalletContext } from './walletcontext'; // Import the WalletContext


const TokenCreate = () => {
  const { walletAddress, connectWallet, disconnectWallet,signer, provider } = useContext(WalletContext); // Get connectWallet from context
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  
  const handleCreate = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first.');
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      console.log(signer)
      const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, abi, signer);

      const transaction = await contract.createToken(name, ticker, imageUrl, description,{
        value: ethers.parseUnits("0.0001", 'ether'),
      }); 
      const receipt = await transaction.wait();

      alert(`Transaction successful! Hash: ${receipt.hash}`);
    console.log('Creating token:', { name, ticker, description, imageUrl });
    navigate('/'); 
  };

  return (
    <div className="app">
   <nav className="navbar">
        {walletAddress ? (
          <>
            <span className="wallet-address">Connected: {walletAddress}</span>
            <button className="nav-button" onClick={disconnectWallet}>Disconnect</button>
          </>
        ) : (
          <button className="nav-button" onClick={connectWallet}>Connect Wallet</button>
        )}
      </nav>
      <div className="token-create-container">
      <h3 className="start-new-coin" onClick={() => navigate('/')}>[go back]</h3>
        <p className="info-text">Coin creation fee: 0.0001 ETH</p>
        <p className="info-text">Max supply: 1 million tokens. Initial mint: 200k tokens.</p>
        <p className="info-text">If funding target of 24 ETH is met, a liquidity pool will be created on Uniswap.</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Token Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Ticker Symbol"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="input-field"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="input-field"
          />
          <button className="create-button" onClick={handleCreate}>Create Token</button>
        </div>
      </div>
    </div>
  );
};

export default TokenCreate;
