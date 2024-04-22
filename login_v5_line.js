import React, { useState } from 'react';
import axios from 'axios';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Alert from '@mui/material/Alert';
import { TextField, Button, Box, Typography, Container, Alert, Paper, InputBase, InputAdornment, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { styled } from '@mui/material/styles'

const logoUrl = 'Singh&Co.png';
const backgroundUrl = 'backgroundtest.png'

const StyledInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 0, // Remove border radius for a flat design
      backgroundColor: 'transparent', // No background color
      border: 'none', // Remove the border
      borderBottom: '1px solid #ced4da', // Just a bottom border
      fontSize: 16,
      padding: '10px 0', // Padding top and bottom only
      '&:focus': {
        borderBottom: `2px solid ${theme.palette.primary.main}`, // Thicker bottom border on focus
      },
    },
  }));

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
                onLogin(username);
            }
            else {
                setError('Login failed');
            }
        } catch (error) {
            setError('Invalid username or password');
        }
    };

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
                        style={{ maxWidth: '100%', height: 'auto'}} // Adjust the size as needed
                    />

                    <Box component="form" sx={{ mt: 1, width: '100%' }}>
                    
                        <StyledInput
                            placeholder="Username"
                            id="bootstrap-input-username"
                            fullWidth
                            value={username} // controlled component with 'username' being the state
                            onChange={(e) => setUsername(e.target.value)} // updates state on user input
                            autoComplete="username"
                            margin="normal"

                        />

                        {/* another TextField for the password */}
                        <StyledInput
                            placeholder="Password" 
                            fullWidth 
                            type="password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            autoComplete='new-password'
                            margin="normal"
                        />

                        {/* button component that triggers the login action when clicked */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained" // stype variant of the button, with a background colour
                            sx={{ mt: 3, mb: 2, borderRadius: 50 }} // adds top and bottom margins
                            onClick={handleLoginClick} // function to call when the button is clicked
                        >
                            Login
                        </Button>
                    
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
