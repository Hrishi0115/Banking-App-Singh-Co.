import React, { useState } from 'react';
import axios from 'axios';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Alert from '@mui/material/Alert';
import { TextField, Button, Box, Typography, Container, Alert, Paper, InputBase } from '@mui/material';

const logoUrl = 'Singh&Co.png';
const backgroundUrl = 'backgroundtest.png'

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
                        style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} // Adjust the size as needed
                    />
                    {/* ... rest of your login form ... */}
                    <Box component="form" sx={{ mt: 1, width: '100%' }}>
                    
                    {/* TextField is an input component for user text input for the username */}
                    <TextField
                        margin="normal" // adds normal margin around the TextField
                        // required // indicates the field is required
                        fullWidth // the TextField will take up the full width of its parent
                        id="username" // id for the input element
                        label="Username" // the label text for the input
                        name="username" // name attribute for the input ? 
                        autoComplete="username" // helps browers auto-fill the input based on its name ?
                        autoFocus // automatically focuses this input when component loads ?
                        value={username} // controlled component with 'username' being the state
                        onChange={(e) => setUsername(e.target.value)} // updates state on user input
                        variant="outlined" // the style variant for the TextField border
                    />

                    {/* another TextField for the password */}
                    <TextField
                        margin="normal" 
                        // required 
                        fullWidth 
                        type="password"
                        id="password" 
                        label="Password" 
                        name="password" 
                        autoComplete="new-password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        variant="outlined"
                    />

                    {/* button component that triggers the login action when clicked */}
                    <Button
                        type="button"
                        fullWidth
                        variant="contained" // stype variant of the button, with a background colour
                        sx={{ mt: 3, mb: 2 }} // adds top and bottom margins
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

