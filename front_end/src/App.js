import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function App() {
  const [balance, setBalance] = useState(null);

  // we will use useEffect to fetch data here

  return (
    <div className="App">
      <header className="App-header">
        <h1>Banking Application</h1>
      </header>
    </div>
  );
}

export default App;
