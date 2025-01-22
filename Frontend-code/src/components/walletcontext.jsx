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
        console.log('Wallet connected and message signed:', signedMessage);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask and try again.');
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setProvider(null);
    setSigner(null);
    setSignature('');
    localStorage.removeItem('walletAddress'); // Remove wallet address from localStorage
  };

  return (
    <WalletContext.Provider value={{ walletAddress, connectWallet, disconnectWallet, signer, provider, signature }}>
      {children}
    </WalletContext.Provider>
  );
};
