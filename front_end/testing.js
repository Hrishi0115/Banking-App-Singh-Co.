import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // State to store the balance fetched from the API
  const [balance, setBalance] = useState(null);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Here we make the call to the FastAPI backend to fetch the balance
    // Replace 'http://localhost:8000' with your actual FastAPI server address if different
    axios.get('http://localhost:8000/balance/Peter%20Pan')
      .then(response => {
        // If the request is successful, we update the balance state with the response data
        setBalance(response.data.balance);
      })
      .catch(error => {
        // If there is an error during the request, we log it to the console
        console.error("Error fetching data:", error);
      });
  }, []); // The empty array means this effect runs once on mount

  // The return statement renders the content of the component
  return (
    <div className="App">
      <header className="App-header">
        <h1>Banking Application</h1>
        {/* Display the fetched balance or "Loading..." if the balance has not been fetched yet */}
        <p>Account Balance for Peter Pan: {balance !== null ? `$${balance}` : 'Loading...'}</p>
      </header>
    </div>
  );
}

export default App;
