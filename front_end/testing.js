import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [balance, setBalance] = useState(null);
  const [username, setUsername] = useState('');  // New state for the username
  const [inputUsername, setInputUsername] = useState('');  // State to track the input field

  const fetchBalance = () => {
    axios.get(`http://localhost:8000/balance/${inputUsername}`)
      .then(response => {
        setBalance(response.data.balance);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setBalance(null); // Reset the balance in case of an error
      });
  };

  // useEffect will no longer be used to fetch the balance on mount
  // We remove the axios call from here

  // Update the username and fetch the balance when the button is clicked
  const handleButtonClick = () => {
    setUsername(inputUsername);
    fetchBalance();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Banking Application</h1>
        <input
          type="text"
          value={inputUsername}
          onChange={e => setInputUsername(e.target.value)}
          placeholder="Enter username"
        />
        <button onClick={handleButtonClick}>Check Balance</button>
        {balance !== null ? (
          <p>Account Balance for {username}: ${balance}</p>
        ) : (
          <p>Enter a username and click "Check Balance"</p>
        )}
      </header>
    </div>
  );
}

export default App;


// C:\Users\HrishiSingh\monzo_api\Monzo_API>cd front_end

// C:\Users\HrishiSingh\monzo_api\Monzo_API\front_end>npm start