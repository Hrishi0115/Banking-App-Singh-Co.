import Login from './login';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function App() {
  // state to store the balance fetched from the API
  const [balance, setBalance] = useState(null);
  const [username, SetUsername] = useState(''); // new state for the username 
  const [inputUsername, setInputUsername] = useState('') // State to track the input field

  // we will use useEffect to fetch data here

  const fetchBalance = () => {
    // here we make the call to the FastAPI backend to fetch the balance
    axios.get(`http://localhost:8000/balance/${inputUsername}`)
      .then(response => {
        // if the request is successful, we update the balance state with the response data
        setBalance(response.data.balance); 
      })
      .catch(error => {
        // if there is an error during the request, we log it to the console
        console.error("Error fetching data:", error);
        setBalance(null);
      });
  };

  const handleButtonClick = () => {
    SetUsername(inputUsername);
    fetchBalance();
  };

  // the return statement renders the content of the component
  return (
    <div className="App">
      <header className="App-header">
        <h1>Banking Application</h1>
        <input
        type="text"
        value={inputUsername}
        onChange={e => setInputUsername(e.target.value)}
        placeholder='Enter username'
        />
        <button onClick={handleButtonClick}>Check Balance</button>
        {balance !== null ? (
          <p>Account Balance for {username}: ${balance}</p>
        ) : (
          <p>Enter a username a click "Check Balance</p>
        )}
      </header>
    </div>
  );
}

export default App;
