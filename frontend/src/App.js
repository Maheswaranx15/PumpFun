import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import { WalletProvider } from './components/walletcontext';
function App() {
  return (
    <div className="App">
      <WalletProvider>
      <Main/>
      </WalletProvider>
    </div>
  );
}

export default App;
