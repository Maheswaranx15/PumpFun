import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
const { ethers } = require('ethers');
const { abi } = require('./abi');
const { WalletContext } = require('./walletcontext') ; // Import the WalletContext


const App = () => {
  const { walletAddress, connectWallet, disconnectWallet, signature } = useContext(WalletContext);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const rpcProvider = new ethers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
        const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, abi, rpcProvider);

        const Tokens = await contract.getAllTokens();

        setCards(
          Tokens.map((token) => ({
            name: token.name,
            symbol: token.symbol,
            description: token.description,
            tokenImageUrl: token.tokenImageUrl,
            fundingRaised: ethers.formatUnits(token.fundingRaised, 'ether'), // Format the fundingRaised from Wei to Ether
            tokenAddress: token.tokenAddress,
            creatorAddress: token.creatorAddress,
          }))
        );
      } catch (error) {
        console.error('Error fetching  tokens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);



  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const navigateToTokenDetail = (card) => {
    navigate(`/token-detail/${card.tokenAddress}`, { state: { card } }); // Use tokenAddress for URL
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

      <div className="card-container">
        <h3 className="start-new-coin" onClick={() => navigate('/token-create')}>
          [start a new coin]
        </h3>
        <img
          src="https://pump.fun/_next/image?url=%2Fking-of-the-hill.png&w=256&q=75"
          alt="Start a new coin"
          className="start-new-image"
        />

        {cards.length > 0 && (
          <div className="card main-card" onClick={() => navigateToTokenDetail(cards[0])}>
            <div className="card-content">
              <img src={cards[0].tokenImageUrl} alt={cards[0].name} className="card-image" />
              <div className="card-text">
                <h2>Created by {cards[0].creatorAddress}</h2>
                <p>Funding Raised: {cards[0].fundingRaised} ETH</p>
                <p>
                  {cards[0].name} (ticker: {cards[0].symbol})
                </p>
                <p>{cards[0].description}</p>
              </div>
            </div>
          </div>
        )}

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="search for token"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <h4 style={{ textAlign: 'left', color: 'rgb(134, 239, 172)' }}>Terminal</h4>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="card-list">
            {cards.slice(1).map((card, index) => (
              <div key={index} className="card" onClick={() => navigateToTokenDetail(card)}>
                <div className="card-content">
                  <img src={card.tokenImageUrl} alt={card.name} className="card-image" />
                  <div className="card-text">
                    <h2>Created by {card.creatorAddress}</h2>
                    <p>Funding Raised: {card.fundingRaised} ETH</p>
                    <p>
                      {card.name} (ticker: {card.symbol})
                    </p>
                    <p>{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
