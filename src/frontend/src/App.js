import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [apiDetails, setApiDetails] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL)
      .then(r => r.json())
      .then((response) => setApiDetails(response));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hi Edit <code>src/App.js</code> and save to reload.
        </p>

        {apiDetails && (
          <p>Connected to {apiDetails.description} v{apiDetails.version}</p>
        )}
      </header>
    </div>
  );
}

export default App;
