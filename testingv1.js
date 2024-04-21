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


return (
  // The Container component acts as a wrapper for the content with a maximum width of 'xs' (extra-small).
  <Container component="main" maxWidth="xs">
  
    // Box is a utility component that serves as a div with styling capabilities. 
    // Here it's setting top margin, display type, flex direction, and alignment for its children.
    <Box
      sx={{
        marginTop: 8, // Adds spacing on the top
        display: 'flex', // Uses flexbox layout
        flexDirection: 'column', // Children are stacked vertically
        alignItems: 'center', // Centers children horizontally
      }}
    >
    
      // Typography is used for text content; in this case, it's used for the title of the form.
      <Typography component="h1" variant="h5">
        Login to Your Account
      </Typography>
      
      // Another Box component acting as a form element with additional top margin styling.
      <Box component="form" sx={{ mt: 1 }}>
        
        // TextField is an input component for user text input for the username.
        // It includes various props like margin, requirement, full width, ids, labels, etc.
        <TextField
          margin="normal" // Adds normal margin around the TextField
          required // Indicates the field is required
          fullWidth // The TextField will take up the full width of its parent
          id="username" // The id for the input element
          label="Username" // The label text for the input
          name="username" // Name attribute for the input, important for accessibility
          autoComplete="username" // Helps browsers auto-fill the input based on its name
          autoFocus // Automatically focuses this input when the component loads
          value={username} // Controlled component with 'username' being the state
          onChange={(e) => setUsername(e.target.value)} // Updates state on user input
          variant="outlined" // The style variant for the TextField border
        />
        
        // Another TextField, this one for the password, includes type="password" to hide text input.
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password" // Hides the input text
          id="password"
          autoComplete="current-password"
          value={password} // Controlled component with 'password' being the state
          onChange={(e) => setPassword(e.target.value)} // Updates state on user input
          variant="outlined"
        />
        
        // Button component that triggers the login action when clicked.
        <Button
          type="button" // Specifies the button type
          fullWidth // The Button will take up the full width of its parent
          variant="contained" // Style variant of the button, with a background color
          sx={{ mt: 3, mb: 2 }} // Adds top and bottom margins
          onClick={handleLoginClick} // Function to call when the button is clicked
        >
          Login
        </Button>
        
        // Conditional rendering of the Alert component if there is an error.
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}> // Alert with 'error' styling and top margin
            {error} // Displays the error message
          </Alert>
        )}
      </Box>
    </Box>
  </Container>
);

import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Alert,
  Paper, // Importing Paper for the box effect
  InputAdornment, // Importing InputAdornment for icons
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle'; // Importing icon for username
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Importing icon for password

const Login = ({ onLogin }) => {
  // ...your existing useState calls and handleLoginClick function

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
        {/* ... rest of your code ... */}
        <Box component="form" sx={{ mt: 1, width: '100%' }}> {/* Use 100% width for the form within the Paper */}
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          {/* ... your password TextField with similar modifications ... */}
          <TextField
            margin="normal"
            fullWidth
            type="password"
            id="password"
            label="Password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* ... rest of your code ... */}
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container, Alert, Paper } from '@mui/material';

// Assuming you have placed the images in the public folder or similar
const logoUrl = 'path-to-your-logo.jpg'; // Replace with the actual path to your logo
const backgroundUrl = 'path-to-your-background-image.jpg'; // Replace with the actual path to your cityscape image

const Login = ({ onLogin }) => {
    // ... your existing state and handleLoginClick function

    return (
        <Container component="main" maxWidth="xs" sx={{
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh', 
            justifyContent: 'center',
            alignItems: 'center', 
            backgroundImage: `url(${backgroundUrl})`, 
            backgroundRepeat: 'no-repeat', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <Paper elevation={3} sx={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                padding: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: for better readability
            }}>
                <Box sx={{ width: '100%', my: 2 }}>
                    <img src={logoUrl} alt="Logo" style={{ width: '100%', height: 'auto' }} />
                </Box>
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                    {/* Your logo can act as the title now */}
                </Typography>
                {/* ... rest of your login form */}
            </Paper>
        </Container>
    );
};

export default Login;
