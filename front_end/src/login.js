import React, { useState } from 'react';
import axios from 'axios';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Alert from '@mui/material/Alert';
import { TextField, Button, Box, Container, Alert, Paper, InputAdornment, } from '@mui/material';
import { styled } from '@mui/material/styles'
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const logoUrl = 'company_logo.png';
const backgroundUrl = 'check3.png'

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'grey', // Set the color of the border
          borderRadius: '0px', // Rounded corners
        },

    '& .MuiInputBase-input': {
        // Add styles for placeholder here
        '&::placeholder': {
        // Styles when the input is not empty
        opacity: 0,
        transition: 'opacity 0.2s ease-in-out',
        },
        '&:not(:placeholder-shown)::placeholder': {
        // Styles when the input is empty
        opacity: 1,
        },
    },
    // Style the text field

      '&:hover fieldset': {
        borderColor: 'darkgrey', // Darker border on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black', // Even darker when field is focused
      },
    },
    // Set the width of the input fields
    width: '80%', // Adjust this value as needed
    maxWidth: '350px', // Adjust this value as needed to match the design
    '& label.Mui-focused': {
        color: 'primary', // Change to your theme's primary color
      },
      '& .MuiInputLabel-outlined': {
        zIndex: 2,
        transform: 'translate(14px, 20px) scale(1)', // Default position
        lineHeight: '1',
        
      },
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)',
      },
      '& .MuiInputBase-input:valid + fieldset .MuiInputLabel-outlined': {
        display: 'none',
      },
      '& .MuiInputBase-input:focus + fieldset .MuiInputLabel-outlined': {
        display: 'none',
      },
      // ... (other styles)
      '& .MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)', // Position after the label shrinks
      },
  
    // Add other styles here as needed
    '& .MuiOutlinedInput-input': {
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 100px #fff inset',
          WebkitTextFillColor: '#000',
          borderRadius: '0px', // Keep consistent with your design
        },
      },
  });
  
  const StyledButton = styled(Button)({
    // Style the button
    backgroundColor: '#E89105', // Use your primary color
    '&:hover': {
      backgroundColor: '#CC7000', // Darker on hover
    },
    width: '50%', // Less wide
    height: '48px', // Taller button
    borderRadius: '0px', // Fully rounded edges
  });
  


const Login = ({ onLogin }) => {
    
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLoginClick = async () => {
        try {
            const response = await axios.post('http://localhost:8000/auth/login', {
                username,
                password
            });
            
            if (response.data.message === 'Login successful!') {
                onLogin(username);
            }
            else {
                setError('Login failed');
            }
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    const [inputFocus, setInputFocus] = useState({ username: false, password: false });

    return (
        // The empty tags <> and </> are shorthand for <React.Fragment> and </React.Fragment>. Fragments let you group a list of children without adding extra nodes to the DOM.
        <>
            <Box sx={{
                position: 'fixed', // Fixed position to ensure it covers the whole screen
                top: 0,
                left: 0,
                width: '100vw', // 100% of the viewport width
                height: '100vh', // 100% of the viewport height
                backgroundImage: `url(${backgroundUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: -1, // Keep the background image behind everything else
            }} />

            <Container component="main" maxWidth="xs" sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', // Ensure at least the full height of the viewport
                alignItems: 'center',
                justifyContent: 'center', // Center the Paper vertically and horizontally
                paddingTop: '64px', // Add some padding at the top
                zIndex: 2, // Higher index than the background image
            }}>
                <Paper elevation={3} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 2,
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    width: '100%', // Responsive width
                    maxWidth: 400, // Maximum width of the Paper
                    position: 'relative',
                    zIndex: 2,
                }}>
                    <img 
                        src={logoUrl} 
                        alt="Logo" 
                        style={{ maxWidth: '75%', height: 'auto', paddingTop: '30px', paddingBottom: '30px'}} // Adjust the size as needed
                    />
                    <Box component="form" sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <StyledTextField
                        autoComplete='username'
                            label="Username"
                            variant="outlined"
                            value={username}
                            margin="normal"
                            onChange={(e) => setUsername(e.target.value)}
                            onFocus={() => setInputFocus({ ...inputFocus, username: true })}
                            onBlur={() => setInputFocus({ ...inputFocus, username: false })}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {inputFocus.username || username ? null : <AccountCircle />}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <StyledTextField
                        autoComplete='new-password'
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={password}
                            margin="normal"
                            onChange={(e) => setPassword(e.target.value)}                    
                            onFocus={() => setInputFocus({ ...inputFocus, password: true })}
                            onBlur={() => setInputFocus({ ...inputFocus, password: false })}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {inputFocus.password || password ? null : <LockOutlinedIcon />}
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                            marginBottom: '20px', // Increase space between Password and Login button
                            }}
                        />
                        <StyledButton
                            type="button"
                            variant="contained"
                            onClick={handleLoginClick}
                        >
                            Login
                        </StyledButton>

                        {/* conditional rendering of the Alert component if there is an error */}
                        {error && (
                            <Alert severity='error' sx={{ mt: 2 }}>
                                {error}
                            </Alert>
                        )}
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default Login;

