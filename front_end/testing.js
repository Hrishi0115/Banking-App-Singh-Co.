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



return (        
  // start the JSX return block, which defines the layoff of this component
  <div className='login-container'> 
      {/* acts as the main container for the login form */}
      <h2>Login to Your Account</h2>
      {/* username input */}
      <div>
          <input
              className='login-input'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
          />
          {/* value is what the input display will show - in this case it shows the most up-to-date value of 'username'.
          onChange is an event listener that is triggered every time the user types into the input box. The event (e) contains detail about the change. Here, e.target.value represents the current value of the input field after any change.
          setUsername(e.target.value) updates the state of username to the latest value typed by the user*/}
      </div>
      {/* password input */}
      <div>
          <input
              className='login-input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
          />
          {/* similar to above, but <input> is of type "password" so that the input characters are obscured for privacy */}
      </div>
      {/* Login button */}
      <div>
          <button className="login-button" onClick={handleLoginClick}>Login</button>
      </div>
      {/* <button> element that users click to submit their credentials
      onClick={handleLoginClick} assigns the 'handleLoginClick' function to the buttom's click event, which will trigger when the user clicks this button.*/}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* so when button is clicked - then the function defined above handleLoginClick is called */}
      {/* the && operator - for conditional rendering - first evaluates the expression before && - if it is truthy (not null - empty string) then React will process and render the element on the right side of the && operator - here the red error message.*/}
  </div>
);



export default Login;


<div className={classes.container}> 
{/* acts as the main container for the login form */}
<Card className={classes.card}>
    <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
            Login to Your Account
        </Typography>
        <TextField
            label="Username"
            variant="outlined"
            fullWidth
            className={classes.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            className={classes.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
            onClick={handleLoginClick}
            >
                Login
            </Button>
            {error && <Typography color="error">{error}</Typography>}
    </CardContent>
</Card>
</div>

import { Card, CardContent, TextField, Button, Typography, makeStyles } from '@mui/material';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #6DD5FA, #FF758C)', // Example gradient
  },
  card: {
    minWidth: 275,
    margin: theme.spacing(2),
  },
  input: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));
