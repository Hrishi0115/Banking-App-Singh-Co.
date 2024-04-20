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

import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginClick = () => {
    // Placeholder for authentication logic
    if (username === 'test' && password === 'password') { // Replace with actual validation logic
      onLogin(username);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleLoginClick}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;

//

import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginClick = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username,
        password
      });
      if (response.data.message === 'Login successful!') {
        onLogin(username); // Perform any actions in the parent component upon successful login
      } else {
        setError('Login failed'); // Show some error from the server response if login wasn't successful
      }
    } catch (error) {
      setError('Invalid username or password'); // This is likely a wrong username/password error
    }
  };

  return (
    
    <div>
      <h2>Login to Your Account</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>
      <div>
        <button onClick={handleLoginClick}>Login</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
