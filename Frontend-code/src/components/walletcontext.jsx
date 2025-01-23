import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [signature, setSignature] = useState('');

  // Check if wallet is already connected (from localStorage or from window.ethereum)
  useEffect(() => {
    if (window.ethereum) {
      const savedAddress = localStorage.getItem('walletAddress');
      if (savedAddress) {
        setWalletAddress(savedAddress);
        connectWallet(savedAddress);
      }
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        const signerInstance = await web3Provider.getSigner();
        const address = await signerInstance.getAddress();
        const domain = window.location.host;
        const nonce = Math.random().toString(36).substring(2);
        const message = `Domain: ${domain}\nAddress: ${address}\nNonce: ${nonce}\nPlease sign this message to verify your identity.`;
        // Sign a message to prove wallet ownership
        const signedMessage = await signerInstance.signMessage(message);

        setProvider(web3Provider);
        setSigner(signerInstance);
        setWalletAddress(address);
        setSignature(signedMessage);

        // Store the wallet address to localStorage
        localStorage.setItem('walletAddress', address);
        let secretMessage = signedMessage
        await authenticateWallet(address, signedMessage , message);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask and try again.');
    }
  };

  const authenticateWallet = async (walletAddress, signature, secretMessage) => {
    try {
      const response = await fetch("http://localhost:8000/api/wallet/authentication", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress, signature, secretMessage }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Wallet authenticated successfully:", data);
      } else {
        console.error("Authentication failed:", data.message);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setProvider(null);
    setSigner(null);
    setSignature('');
    localStorage.removeItem('walletAddress'); 
  };

  return (
    <WalletContext.Provider value={{ walletAddress, connectWallet, disconnectWallet, signer, provider, signature }}>
      {children}
    </WalletContext.Provider>
  );
};
