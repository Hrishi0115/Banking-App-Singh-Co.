import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function App() {
  // state to store the balance fetched from the API
  const [balance, setBalance] = useState(null);

  // we will use useEffect to fetch data here

  useEffect(() => {
    // here we make the call to the FastAPI backend to fetch the balance
    axios.get('http://localhost:8000/balance/Peter%20Pan')
    // test with Peter Pan first - then parameterise user in later version
      .then(response => {
        // if the request is successful, we update the balance state with the response data
        console.log(response.data)
        setBalance(response.data.balance); 
      })
      .catch(error => {
        // if there is an error during the request, we log it to the console
        console.error("Error fetching data:", error); 
      });
  }, []); // the empty array means this effect runs once on mount
  
  // the return statement renders the content of the component
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
